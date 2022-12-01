import {useHistory} from "react-router";
import "./Splash.css";

export default function Splash() {
    const history = useHistory()

    const handleSurprise = () => {
        fetch("/api/recipes/random")
        .then(res => res.json())
        .then(json => history.push(`/recipes/${json.recipeId}`))
    }

    return (
        <>
            <div id="home-splash">
                <div id="home-splash-header">
                    <h1>LET'S GET COOKIN</h1>
                    <button onClick={handleSurprise}>SURPRISE ME</button>
                </div>
            </div>
        </>
    )
}
