import {useState, useEffect} from "react";
import {useHistory} from "react-router";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./Recipes.css";

export default function Recipes() {
    const [recipes, setRecipes] = useState([])
    console.log(recipes)

    const history = useHistory();

    useEffect(() => {
        fetch("/api/recipes")
        .then(res => res.json())
        .then(recipes => setRecipes(recipes.slice(0, 5)))
    }, [])

    return (
        <ul id="recipes-container">
            {
                recipes.map(({title, authorName, previewImageURL}) => <RecipeCard title={title} authorName={authorName} previewImageURL={previewImageURL}/>)
            }
        </ul>
    )

}
