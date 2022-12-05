from .db import db, SCHEMA, environment, add_prefix_for_prod
from .user import User

class Recipe(db.Model):
    __tablename__ = "recipes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    preview_image = db.Column(db.String(2048))
    title = db.Column(db.String(40))
    description = db.Column(db.String(1000))
    ingredients = db.Column(db.String)
    steps = db.Column(db.String)

    user = db.relationship("User", back_populates="recipes")
    notes = db.relationship("Note", back_populates="recipe")

    def to_dict(self):
        return {
            "id": self.id,
            "recipeAuthorId": self.recipe_author_id,
            "previewImage": self.preview_image,
            "title": self.title,
            "description": self.description,
            "ingredients": self.ingredients,
            "steps": self.steps
        }

    