import "./Notes.css"

export default function Notes({notes}) {
    console.log(notes);
    return (
        <div id="notes">
            <h2>Notes</h2>
            <ul>
                {
                  notes.map(({id, note, noteAuthorName}) => {
                    return (
                      <li key={id}>
                          <p>{note}</p>
                          <p>{noteAuthorName}</p>
                      </li>
                    )
                  })
                }
            </ul>
        </div>
    )
}
