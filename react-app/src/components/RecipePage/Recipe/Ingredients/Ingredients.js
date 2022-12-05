import "./Ingredients.css";

export default function Ingredients({ingredients}) {
    return (
        <div id="ingredients">
            <h2 id="ingredients-header">Ingredients</h2>
            <ul id="ingredients-list">
                {
                    ingredients.map((ingredient) => {
                        return (
                            <li key={ingredient} className={"ingredients-ingredient"}>
                                <p className="ingredients-ingredient">{ingredient}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
