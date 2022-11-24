from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User

class note:
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key = True)
    note_author_id = db.Column(db.Integer)
    note_recipe_id = db.Column(db.Integer)
    note = db.Column(db.String(1000))



    def to_dict(self):
        pass
