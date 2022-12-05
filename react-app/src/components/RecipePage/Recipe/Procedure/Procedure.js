import "./Procedure.css"

export default function Procedure({procedure}) {
    return (
        <div id="procedure">
            <h2 id="procedure-header">Steps</h2>
            <ol id="procedure-list">
                {
                    procedure.map((step, i) => {
                        return (
                            <li key={step} className="procedure-step">
                                <h3 className="procedure-step-header">{`Step ${i + 1}`}</h3>
                                <p>{step}</p>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}
