from .db import db, SCHEMA, environment, add_prefix_for_prod
from .user import User

class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    recipe_author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(255))
    description = db.Column(db.String(255))
    ingredients = db.Column(db.String)
    steps = db.Column(db.String)

    user = db.relationship("User", back_populates="recipes")

    def to_dict(self):
        return {
            "id": self.id,
            "recipeAuthorId": self.recipe_author_id,
            "title": self.title,
            "description": self.description,
            "ingredients": self.ingredients,
            "steps": self.steps
        }

    