from .db import db, SCHEMA, environment, add_prefix_for_prod
from .user import User

class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    recipe_author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(255))
    description = db.Column(db.String(255))
    ingredients = db.Column(db.String)
    steps = db.Column(db.String)

    def to_dict(self):
        pass
