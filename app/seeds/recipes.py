from app.models import db, Recipe, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_recipes():
    demo_recipe = Recipe(
        recipe_author_id=1,
        preview_image ='https://static01.nyt.com/images/2021/11/02/dining/kla-hasselback-potatoes/kla-hasselback-potatoes-master768.jpg?w=1280&q=75',
        title='potatoes', 
        description = "yummy potatoes", 
        ingredients = "1 lb potatoes", 
        steps = "cook potatoes")
    marnie_recipe = Recipe(
        recipe_author_id=2, 
        preview_image ='https://static01.nyt.com/images/2020/11/25/dining/23leftoversrex1/merlin_179868645_ccb9d1b4-9544-4368-afa4-c5fa354aa794-master768.jpg?w=1280&q=75', 
        title='sandwich', 
        description = "yummy sandwich", 
        ingredients = "1 lb sandwich", 
        steps = "assemble sandwich")
    bobbie_recipe = Recipe(
        recipe_author_id=3, 
        preview_image ='https://static01.nyt.com/images/2022/01/03/dining/kc-bean-and-cheese-burritos/kc-bean-and-cheese-burritos-master768.jpg', 
        title='burritos', 
        description = "yummy burritos", 
        ingredients = "1 lb burritos", 
        steps = "roll burrito")

    db.session.add(demo_recipe)
    db.session.add(marnie_recipe)
    db.session.add(bobbie_recipe)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM recipes")
        
    db.session.commit()
