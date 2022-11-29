from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, User, Recipe, Note
from .auth_routes import validation_errors_to_error_messages

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
@recipe_routes.get()
def all_recipes():
    pass

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
    pass


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
@recipe_routes.post()
@login_required
def create_recipe():
    pass



#200 same as recipe_by_id
#400 same as create_recipe
#401 same as create_recipe
#403
# {
#     "message": "authorization required"
# }
@recipe_routes.put("/<int:recipe_id>"):
@login_required
def edit_recipe(recipe_id):
    pass

# 200
# {
#     "message": "successfully deleted"
# }
# 401 same as create_recipe
# 403 same as edit_recipe
@recipe_routes.delete("/<int:recipe_id>")
def delete_recipe(recipe_id):
    pass
