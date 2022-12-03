import {useEffect, useState} from "react";
import {useParams} from "react-router";
import Title from "./Title/Title"
import Ingredients from "./Recipe/Ingredients/Ingredients";
import Procedure from "./Recipe/Procedure/Procedure"
import Notes from "./Notes/Notes";
import "./RecipePage.css";

export default function RecipePage() {
    const [recipe, setRecipe] = useState(null)

    const params = useParams();
    
    useEffect(() => {
        const recipe = fetch(`/api/recipes/${params.recipeId}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return {}
            }
        })
        .then(result => {
            setRecipe(result)
        })
    }, [])

    
    if (recipe && !Object.keys(recipe).length) {
        return <h1>Recipe not found</h1>
    } 

    return recipe && (
        <div id="recipe-page">
            <Title title={recipe.title} author={recipe.recipeAuthorName} image={recipe.previewImage} description={recipe.description}/>
            <div id="recipe-page-recipe-container">
                <Ingredients ingredients={recipe.ingredients}/>
                <Procedure procedure={recipe.steps}/>
            </div>
            <Notes notes={recipe.notes}/>
        </div>
    )
    
}
