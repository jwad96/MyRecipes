from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, User, Recipe, Note
from ..forms import NoteForm
from .auth_routes import validation_errors_to_error_messages
import json

note_routes = Blueprint("note_routes", __name__)


# 200
# [
#     {
#         "id": 1
#         "noteAuthorId": 1,
#         "noteRecipeId": 1,
#         "noteAuthorName": "Mike"
#         "note": "use salt, thank me later"
#     }
# ]
# 404
# {
    # "message": "recipe could not be found"
# }
@note_routes.get("")
def get_recipe_notes(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return {"message": "recipe could not be found"}, 404

    notes = [note for note in recipe.notes]
    parsed_notes = []

    for note in notes:
        parsed_note = note.to_dict()
        parsed_note["noteAuthorName"] = note.user.username
        parsed_notes.append(parsed_note)

    return json.dumps(parsed_notes)



@note_routes.get("/<int:note_id>")
def get_recipe_note(note_id):
    note = Note.query.get(note_id)

    if not note:
        return {"message": "note could not be found"}, 404

    parsed_note = note.to_dict()
    parsed_note["noteAuthorName"] = note.user.username

    return json.dumps(parsed_note)



# 201
# {
#     "noteAuthorName": "Mike",
#     "note": "use salt, thank me later"
# }
# 400
# {
#     "message": "Validation error",
#     "errors": {
#         "note": "note must be between 1 and 1000 characters"
#     }
# }
# 401
# {
#     "message": "authentication required"
# }
# 404 same as get_recipe_notes
@note_routes.post("")
@login_required
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        request_json = request.get_json()

        if "note_recipe_id" not in request_json:
            return json.dumps({"message": "recipe could not be found because it wasn't specified"}), 404

        note = Note(
            note_author_id = current_user.id,
            note_recipe_id = request_json["note_recipe_id"],
            note = form.data["note"]
        )

        db.session.add(note)
        db.session.commit()
        
        parsed_note = note.to_dict()
        parsed_note["noteAuthorName"] = User.query.get(current_user.id).username

        return json.dumps(parsed_note)

    return json.dumps({"message": "Validation error", "errors": validation_errors_to_error_messages(form.errors)}), 400

# 201
# {
#     "noteAuthorName": "Mike",
#     "note": "use salt, thank me later"
# }
# 400
# {
#     "message": "Validation error",
#     "errors": {
#         "note": "note must be between 1 and 1000 characters"
#     }
# }
# 401
# {
#     "message": "authentication required"
# }
# 403
# {
#     "message": "authorization required"
# }
# 404 
# {
#     "message": "note could not be found"
# }
@note_routes.put("/<int:note_id>")
@login_required
def edit_note(note_id):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note = Note.query.get(note_id)

        if not note:
            return json.dumps({"message": "note could not be found"}), 404
        
        if note.note_author_id != current_user.id:
            return json.dumps({"message": "authorization required"}), 403

        request_json = request.get_json()


        note.note = form.data["note"]

        db.session.commit()
        
        parsed_note = note.to_dict()
        parsed_note["noteAuthorName"] = User.query.get(current_user.id).username

        return json.dumps(parsed_note)

    return json.dumps({"message": "Validation error", "errors": validation_errors_to_error_messages(form.errors)}), 400



# 200
# {
#     "message": "successfully deleted"
# }
# 401
# {
#     "message": "authentication required"
# }
# 403
# {
#     "message": "authorization required"
# }
# 404 
# {
#     "message": "note could not be found"
# }
@note_routes.delete("/<int:note_id>")
@login_required
def delete_note(note_id):
    note = Note.query.get(note_id)

    if not note:
        return {"message": "note could not be found"}, 404

    if note.note_author_id != current_user.id:
        return {"message": "authorization required"}, 403

    db.session.delete(note)
    db.session.commit()

    return {"message": "note successfully deleted"}, 200
