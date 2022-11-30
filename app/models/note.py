from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User

class Note(db.Model):
    __tablename__ = "notes"

    if environment == 'production': 
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    note_author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    note_recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    note = db.Column(db.String(1000))

    user = db.relationship("User", back_populates="notes")
    recipe = db.relationship("Recipe", back_populates="notes")


    def to_dict(self):
        return {
            "id": self.id,
            "noteAuthorId": self.note_author_id,
            "noteRecipeId": self.note_recipe_id,
            "note": self.note
        }
