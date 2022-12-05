from app.models import db, Recipe, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
marnie_description = '''
The sandwich you make with all the prized leftovers the day after Thanksgiving might be even better than the main event. Assembling this leftover Thanksgiving sandwich is easy, but the details matter. The white and dark turkey meat each get special love and attention: The breast is warmed in butter, while the dark meat is shredded, then warmed in gravy. This club ditches the usual third slice of bread for a slab of crisp, fried stuffing instead. When heating the stuffing, make sure your pan is good and hot so the stuffing fries up fast without falling apart in the skillet. A generous swipe of cranberry mayo brings the whole thing together.
'''

demo_description = '''
This golden and glorious mash-up of potato gratin and Hasselback potatoes, from the acclaimed food science writer J. Kenji López-Alt, has been engineered to give you both creamy potato and singed edge in each bite. The principal innovation here is placing the sliced potatoes in the casserole dish vertically, on their edges, rather than laying them flat as in a standard gratin, in order to get those crisp ridges on top. Allow extra time for the task of slicing the potatoes, for which it's helpful to have a mandoline or food processor (though not necessary, strictly speaking). And do buy extra potatoes, just in case; you want to pack the potatoes tightly and keep them standing up straight.
'''

bobbie_description = '''
Mexican refried beans are a cinch to make at home on a weeknight thanks to some staple pantry items and a few basic fresh ingredients. Buttery canned pinto beans are perfect in this dish, breaking down into a creamy, silky mixture. (Black beans would also work great.) While the beans are often fried in lard or bacon drippings, this vegetarian version builds flavor with caramelized onion, bell pepper, garlic and smoked paprika instead. Pico de gallo adds a touch of tang to counter the rich beans. Pan-frying the wrapped burritos guarantees a golden, irresistibly crispy exterior and an interior that oozes with melted cheese.
'''


marnie_ingredients = '''
2 tablespoons unsalted butter, plus more for greasing the pan
4 cups leftover stuffing
1 cup mayonnaise
1 cup homemade, canned or jarred cranberry sauce
1 cup shredded dark-meat turkey
1 cup leftover gravy
4 teaspoons neutral oil
1 cup sliced turkey breast
Kosher salt and freshly ground black pepper
8 slices sandwich bread (preferably 4- to 5-inch square slices), toasted if desired
2 cups assorted Thanksgiving leftovers (any combination of cooked green beans, sweet potatoes, mashed potatoes or other sides), warmed
'''

demo_ingredients = '''
3 ounces finely grated Gruyère or comté cheese
2 ounces finely grated Parmigiano-Reggiano
2 cups heavy cream
2 medium cloves garlic, minced
1 tablespoon fresh thyme leaves, roughly chopped
Kosher salt and black pepper
4 pounds russet potatoes, peeled and sliced
2 tablespoons unsalted butter
'''

bobbie_ingredients = '''
1/4 cup safflower or canola oil
1/2 cup finely chopped yellow onion (from ½ medium onion)
1/2 cup finely chopped green bell pepper (from ½ pepper)
Kosher salt and black pepper
2 garlic cloves, minced
2 (15-ounce) cans pinto beans, ½ cup of bean liquid reserved and the rest drained
1/2 cup store-bought or homemade pico de gallo or salsa
1/4 tsp teaspoon smoked paprika
6 (9- to 10-inch) flour tortillas
2 cups (8 ounces) shredded sharp Cheddar
Sour cream and hot sauce, for serving
'''

marnie_steps = '''
Grease a 8- or 9-inch square baking pan with butter, then line it with parchment paper, covering the bottom and 2 sides with one sheet, creasing it into the corners to ensure a snug fit. If the stuffing is cold, warm it in the microwave for 1 minute or covered in a 350-degree oven for 15 minutes.
Put the stuffing into the prepared pan and press into an even layer using an offset spatula or the back of a spoon. Top with a sheet of parchment and press firmly with your hands, tightly compacting the stuffing. If you have a second pan of the same size, use that to pack down the stuffing. Cover and chill overnight.
The next day, prepare your sandwich fillings: In a small bowl, whisk together the mayonnaise and cranberry sauce. Set aside.
In a small saucepan, combine the shredded dark-meat turkey and the gravy. Gently heat over medium-low, stirring occasionally, until warmed through, about 5 minutes.
In a large nonstick skillet or well-seasoned cast-iron skillet over medium-high, warm the oil until hot and shimmering. (The stuffing needs to be cooked hot and fast, or it will stick to the skillet and fall apart.) Meanwhile, remove the stuffing from the pan by lifting the parchment overhang, and cut the stuffing into four squares.
Cook stuffing until browned and crisp on one side, gently pressing it down using the base of the baking pan you chilled it in, about 1 minute. Using a flat spatula, quickly flip each piece of stuffing. Cook the other side until browned and crisp, about 1 minute. Transfer to a plate.
In the same skillet, melt the 2 tablespoons butter over medium-low heat until foamy. Add the sliced turkey breast, flipping occasionally until warmed through, about 3 minutes. Season with salt and pepper.
Assemble the sandwiches: Evenly spread 2 tablespoons of cranberry mayonnaise on 1 side of each slice of bread. Divide the buttery sliced turkey over the 4 slices of bread. Divide half the assorted leftovers on top of the white meat, then top each with a slab of crisp stuffing.
On top of the crisp stuffing, evenly divide the gravy-dressed dark meat and the remaining assorted leftovers. Top with remaining mayo-slathered bread. Using a sharp serrated knife, cut each sandwich on the diagonal and serve right away.
'''
demo_steps = '''
Adjust oven rack to middle position and heat oven to 400 degrees. Combine cheeses in a large bowl. Transfer ⅓ of cheese mixture to a separate bowl and set aside. Add cream, garlic and thyme to cheese mixture. Season generously with salt and pepper. Add potato slices and toss with your hands until every slice is coated with cream mixture, making sure to separate any slices that are sticking together to get the cream mixture in between them.
Grease a 2-quart casserole dish with butter. Pick up a handful of potatoes, organizing them into a neat stack, and lay them in the casserole dish with their edges aligned vertically. Continue placing potatoes in the dish, working around the perimeter and into the center until all the potatoes have been added. The potatoes should be very tightly packed. If necessary, slice an additional potato, coat with cream mixture, and add to casserole. Pour the excess cream/cheese mixture evenly over the potatoes until the mixture comes halfway up the sides of the casserole. You may not need all the excess liquid.
Cover dish tightly with foil and transfer to the oven. Bake for 30 minutes. Remove foil and continue baking until the top is pale golden brown, about 30 minutes longer. Carefully remove from oven, sprinkle with remaining cheese, and return to oven. Bake until deep golden brown and crisp on top, about 30 minutes longer. Remove from oven, let rest for a few minutes, and serve.
'''
bobbie_steps = '''
In a large nonstick skillet, heat 2 tablespoons of the oil over medium. Add onion and bell pepper, season with salt and pepper, and cook, stirring occasionally, until light golden and tender, about 8 minutes. Stir in garlic until fragrant, 1 minute. Add pinto beans, pico de gallo, smoked paprika, reserved bean liquid and ½ cup of water, and bring to a simmer. Cook, stirring and mashing occasionally with a potato masher or the back of a spoon, until liquid is absorbed and mixture is thick, about 8 minutes. Season with salt and pepper. Transfer refried beans to a bowl, and wipe out skillet.
Spread ½ cup of the refried beans in the center of each tortilla and top each with ⅓ cup of the cheese. Fold the short sides of the tortilla over the filling; fold the bottom of the tortilla up and over the filling and tightly roll.
In the skillet, heat 1 tablespoon of the oil over medium. Add 3 burritos seam side down and cook until golden, turning occasionally, 3 to 5 minutes. Transfer to serving plates and repeat with the remaining 1 tablespoon oil and 3 burritos. Serve warm with sour cream and hot sauce on the side.
'''

demo_description = "hello"
bobbie_description = "hello"
marnie_description = "hello"



def seed_recipes():
    demo_recipe = Recipe(
        recipe_author_id=1,
        preview_image ='https://static01.nyt.com/images/2021/11/02/dining/kla-hasselback-potatoes/kla-hasselback-potatoes-master768.jpg?w=1280&q=75',
        title='Potatoes', 
        description = demo_description, 
        ingredients = demo_ingredients, 
        steps = demo_steps)
    marnie_recipe = Recipe(
        recipe_author_id=2, 
        preview_image ='https://static01.nyt.com/images/2020/11/25/dining/23leftoversrex1/merlin_179868645_ccb9d1b4-9544-4368-afa4-c5fa354aa794-master768.jpg?w=1280&q=75', 
        title='Sandwich', 
        description = marnie_description, 
        ingredients = marnie_ingredients, 
        steps = marnie_steps)
    bobbie_recipe = Recipe(
        recipe_author_id=3, 
        preview_image ='https://static01.nyt.com/images/2022/01/03/dining/kc-bean-and-cheese-burritos/kc-bean-and-cheese-burritos-master768.jpg', 
        title='Burritos', 
        description = bobbie_description, 
        ingredients = bobbie_ingredients, 
        steps = bobbie_steps)

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
