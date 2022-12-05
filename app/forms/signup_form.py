from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def is_email(form, field):
    email = field.data

    if email.count('@') != 1:
        raise ValidationError("Email must have exactly one @ symbol")

    second_half = email[email.index('@')+1:]

    email_split = email.split('@')
    second_half_split = second_half.split('.')

    check_1 = len(email_split) == 2 and email_split[0] and email_split[1]
    check_2 = len(second_half_split) >= 2 and second_half_split[-1] and second_half_split[-2]

    if not (check_1 and check_2):
        raise ValidationError('Provide a valid email')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, is_email])
    password = StringField('password', validators=[DataRequired()])
