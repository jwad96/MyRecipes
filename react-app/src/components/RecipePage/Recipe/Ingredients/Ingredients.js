import "./Ingredients.css";

export default function Ingredients({ingredients}) {
    return (
        <ul id="ingredients">
            {
                ingredients.map((ingredient) => {
                    return (
                        <li key={ingredient} className={"ingredients-ingredient"}>
                            <p>{ingredient}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}
