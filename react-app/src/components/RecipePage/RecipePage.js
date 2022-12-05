import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import Title from "./Title/Title"
import Ingredients from "./Recipe/Ingredients/Ingredients";
import Procedure from "./Recipe/Procedure/Procedure"
import Notes from "./Notes/Notes";
import NoteForm from "./Notes/NoteForm/NoteForm"
import "./RecipePage.css";

export default function RecipePage() {
    const [recipe, setRecipe] = useState(null)
    const [recipeNotes, setRecipeNotes] = useState([])

    const user = useSelector(state => state.session.user)

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
            setRecipeNotes(result.notes)
        })
    }, [])

    
    if (recipe && !Object.keys(recipe).length) {
        return <h1 id="recipe-page-error-header">Recipe not found</h1>
    } 


    return recipe && (
        <div id="recipe-page">
            <Title id={recipe.id} authorId={recipe.recipeAuthorId} title={recipe.title} author={recipe.recipeAuthorName} image={recipe.previewImage} description={recipe.description}/>
            <div id="recipe-page-recipe-container">
                <Ingredients ingredients={recipe.ingredients}/>
                <Procedure procedure={recipe.steps}/>
            </div>
            <div id="recipe-page-notes-container">
                <NoteForm recipeId={params.recipeId} setRecipeNotes={setRecipeNotes}/>
                <Notes notes={recipeNotes} setRecipeNotes={setRecipeNotes}/>
            </div>
        </div>
    )
    
}
