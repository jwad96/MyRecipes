import "./Title.css"

export default function Title({title, image, author, description}) {
    return (
        <div id="title-container">
            <div id="title-title">{title}</div>
            <div id="title-author">{author}</div>
            <div id="title-image">{image}</div>
            <p id="title-description">{description}</p>
        </div>
    )
}
