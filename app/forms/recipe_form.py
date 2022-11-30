from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


class RecipeForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    ingredients = StringField("Ingredients", validators=[DataRequired()])
    steps = StringField("Steps", validators=[DataRequired()])
    preview_image = StringField("Preview Image", validators=[])
