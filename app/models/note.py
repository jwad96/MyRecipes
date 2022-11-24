from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User

class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key = True)
    note_author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    note_recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    note = db.Column(db.String(1000))



    def to_dict(self):
        pass
