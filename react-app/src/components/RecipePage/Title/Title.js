import "./Title.css"

export default function Title({title, image, author, description}) {
    const backgroundStyle = {backgroundImage: `url(${image})`}

    return (
        <div id="title-container">
            <div id="title-title-container">
              <div id="title-title">{title}</div>
              <div id="title-author">by {author}</div>
            </div>
            <div id="title-image" style={backgroundStyle} />
            <p id="title-description">{description}</p>
        </div>
    )
}
