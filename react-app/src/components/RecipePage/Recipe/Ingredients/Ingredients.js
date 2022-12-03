import "./Ingredients.css";

export default function Ingredients({ingredients}) {
    return (
        <ul>
            {
                ingredients.map((ingredient) => {
                    return (
                        <li>
                            <p>{ingredient}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}
