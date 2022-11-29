from flask import Blueprint, request
from flask_login import login_required, current_user
from ..model import db, User, Recipe, Note
from .auth_routes import validation_errors_to_error_messages

note_routes = Blueprint("notes", __name__)


# 200
# [
#     {
#         "noteAuthorName": "Mike"
#         "note": "use salt, thank me later"
#     }
# ]
# 404
# {
#     "message": "recipe could not be found"
# }
@note_routes.get("/<int:recipe_id>")
def get_recipe_notes(recipe_id):
    pass


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
# 404 same as get_recipe_notes
@note_routes.post("/<int:recipe_id>")
def create_note(recipe_id):
    pass

# 200 same as create_note
# 400 same as create_note
# 401 same as create_note
# 404 same as create_note
# 404 
# {
#     "message": "note could not be found"
# }
@note_routes.put("/<int:recipe_id>/<int:note_id>")
def edit_note(recipe_id, note_id):
    pass


# 200
# {
#     "message": "successfully deleted"
# }
# 401 same as create_note
# 400 same as create_note
# 401 same as create_note
# 404 same as create_note
# 404 same as edit_note
@note_routes.delete("/<int:recipe_id>/<int:note_id>")
def delete_note(recipe_id, note_id):
    pass
