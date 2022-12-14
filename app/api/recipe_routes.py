from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, User, Recipe, Note
from ..forms import RecipeForm
from .auth_routes import validation_errors_to_error_messages
import json
import random


recipe_routes = Blueprint('recipes', __name__)

# 200
# [
#     {
#         recipeId: 1,
#         title: "Potatoes",
#         authorName: "Mike"
#     }, 
#     ...
# ]
@recipe_routes.get('')
def all_recipes():
    recipes = Recipe.query.all()
    parsed_recipes = []
    for recipe in recipes:
        parsed_recipe = {
            "recipeId": recipe.id,
            "title": recipe.title,
            "authorName": recipe.user.username,
            "previewImageURL": recipe.preview_image 
        }
        parsed_recipes.append(parsed_recipe)
    return json.dumps(parsed_recipes)

# 200
# {
#     recipeId: 1,
#     recipeTitle: "Potatoes",
#     recipeAuthorName: "Mike",
#     recipeDescription: "best potatoes",
#     recipeIngredients: "1 pound potatoes",
#     recipeSteps: "cook the potatoes"
# }
# 404
# {
#     "message": "recipe could not be found"
# }
@recipe_routes.get("/<int:recipe_id>")
def recipe_by_id(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    
    if not recipe:
        return json.dumps({"message": "recipe could not be found"}), 404

    parsed_recipe = recipe.to_dict()

    parsed_recipe["recipeAuthorName"] = recipe.user.username

    parsed_notes = []
    for note in recipe.notes:
        parsed_note = note.to_dict()
        parsed_note["noteAuthorName"] = note.user.username
        parsed_notes.append(parsed_note)

    parsed_recipe["notes"] = parsed_notes
    parsed_recipe["ingredients"] = [ingredient for ingredient in recipe.ingredients.split('\n') if ingredient]
    parsed_recipe["steps"] = [step for step in recipe.steps.split('\n') if step]
    
    return json.dumps(parsed_recipe)


# 200 same as recipe_by_id
# 400
# {
#     "message": "Validation error",
#     "errors": {
#         "title": "Potatoes",
#         "description": "best potatoes",
#         "ingredients": "1 pound potatoes",
#         "steps": "cook the potatoes"
#     }   
# }

# 401
# {
#     "message": "authentication required"
# }
@recipe_routes.post('')
@login_required
def create_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe(
            recipe_author_id = current_user.id,
            title = form.data["title"],
            description = form.data["description"],
            ingredients = form.data["ingredients"],
            steps = form.data["steps"],
            preview_image = form.data["preview_image"] or "https://images.unsplash.com/photo-1631898040032-da1a5a87d13b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        )

        db.session.add(recipe)
        db.session.commit()

        parsed_recipe = recipe.to_dict()
        parsed_recipe["notes"] = []

        return json.dumps(parsed_recipe)

    return json.dumps({"message": "Validation error", "errors": validation_errors_to_error_messages(form.errors)}), 400


#200 same as recipe_by_id
#400 same as create_recipe
#401 same as create_recipe
#403
# {
#     "message": "authorization required"
# }
@recipe_routes.put("/<int:recipe_id>")
@login_required
def edit_recipe(recipe_id):
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe.query.get(recipe_id)

        if not recipe:
            return json.dumps({"message": "Recipe could not be found"}), 404

        if recipe.recipe_author_id != current_user.id:
            return json.dumps({"message": "authorization required"}), 403

        recipe.title = form.data["title"]
        recipe.description = form.data["description"]
        recipe.ingredients = form.data["ingredients"]
        recipe.steps = form.data["steps"]
        recipe.preview_image = form.data["preview_image"]

        db.session.commit()

        parsed_recipe = recipe.to_dict()

        parsed_notes = []
        for note in recipe.notes:
            parsed_note = note.to_dict()
            parsed_note["noteAuthorName"] = note.user.username
            parsed_notes.append(parsed_note)

        parsed_recipe["notes"] = parsed_notes

        return json.dumps(parsed_recipe)

    return json.dumps({"message": "Validation error", "errors": validation_errors_to_error_messages(form.errors)}), 400

# 200
# {
#     "message": "successfully deleted"
# }
# 401 same as create_recipe
# 403 same as edit_recipe
@recipe_routes.delete("/<int:recipe_id>")
@login_required
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return json.dumps({"message": "Recipe could not be found"}), 404
        
    if recipe.recipe_author_id != current_user.id:
        return json.dumps({"message": "authorization required"}), 403

    db.session.delete(recipe)
    db.session.commit()

    return {"message": "recipe successfully deleted"}

# utility routes
@recipe_routes.get("/random")
def random_recipe():
    recipes = Recipe.query.all();
    return {
        "recipeId": random.choice(recipes).id
    }
