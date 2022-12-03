import "./Procedure.css"

export default function Procedure({procedure}) {
    return (
        <ol id="procedure">
            {
                procedure.map((step, i) => {
                    return (
                        <li key={step} className="procedure-step">
                            <p>{`${i + 1}) ${step}`}</p>
                        </li>
                    )
                })
            }
        </ol>
    )
}
