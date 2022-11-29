from app.models import db, Note, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_notes():
    demo_note = Note(
        note_author_id=1, note_recipe_id= 2 , note='do not burn the potato')
    marnie_note = Note(
        note_author_id=2, note_recipe_id= 3 , note='do not burn the sandwich')
    bobbie_note = Note(
        note_author_id=3, note_recipe_id= 1 , note='do not burn the burrito')

    db.session.add(demo_note)
    db.session.add(marnie_note)
    db.session.add(bobbie_note)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notes")
        
    db.session.commit()
