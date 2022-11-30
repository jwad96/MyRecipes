from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


class NoteForm(FlaskForm):
    note = StringField("Note", validators=[DataRequired()])
