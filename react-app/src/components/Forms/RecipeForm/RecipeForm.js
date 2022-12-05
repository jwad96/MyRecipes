import {useState, useEffect} from "react";
import {useSelector} from "react-redux"
import {useParams, useHistory} from "react-router";

import "./RecipeForm.css"

export default function RecipeForm({edit}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("")
    const [previewImage, setPreviewImage] = useState("");
    
    
    let validationErrors = {
        title: "  Cannot be empty",
        description: "  Cannot be empty",
        ingredients: "  Cannot be empty",
        steps: "  Cannot be empty",
        previewImage: "  Must start with either http:// or https://"
    }

    if (edit) {
        validationErrors = {};
    }
    
    const [errors, setErrors] = useState(validationErrors);
    const [submitted, setSubmitted] = useState(false)

    const params = useParams();
    const history = useHistory();

    const handleFormSubmit = e => {
        e.preventDefault();
        setSubmitted(true);

    }

    useEffect(() => {
        const populate = async () => {
            const recipe = await fetch(`/api/recipes/${params.recipeId}`).then(res => res.json())

            if (recipe.id) {
                setTitle(recipe.title);
                setDescription(recipe.description);
                setIngredients(recipe.ingredients.join('\n'));
                setSteps(recipe.steps.join('\n'))
                setPreviewImage(recipe.previewImage);
            }
        }

        if (edit) {
            populate()
        }
    }, [])

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        if (!e.target.value) {
            setErrors(errors => ({...errors, title: "  Cannot be empty"}))
        } else if (errors.title) {
            setErrors(errors => {
                const newErrors = {...errors}
                delete newErrors.title
                return newErrors
            })
        }
    };
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
        if (!e.target.value) {
            setErrors(errors => ({...errors, description: "  Cannot be empty"}))
        } else if (errors.description) {
            setErrors(errors => {
                const newErrors = {...errors}
                delete newErrors.description
                return newErrors
            })
        }
    };
    const handleChangeIngredients = (e) => {
        setIngredients(e.target.value)
        if (!e.target.value) {
            setErrors(errors => ({...errors, ingredients: "  Cannot be empty"}))
        } else if (errors.ingredients) {
            setErrors(errors => {
                const newErrors = {...errors};
                delete newErrors.ingredients;
                return newErrors;
            })
        }
    };
    const handleChangeSteps = (e) => {
        setSteps(e.target.value);
        if (!e.target.value) {
            setErrors(errors => ({...errors, steps: "  Cannot be empty"}))
        } else if (errors.steps) {
            setErrors(errors => {
                const newErrors = {...errors}
                delete newErrors.steps;
                return newErrors;
            })
        }
    };
    const handleChangeImage = (e) => {
        setPreviewImage(e.target.value)
        if (!e.target.value.startsWith("http://") && !e.target.value.startsWith("https://")) {
            setErrors(errors => ({...errors, previewImage: "  Must start with either http:// or https://"}))
        } else if (errors.previewImage) {
            console.log("we're in the clear?")
            setErrors(errors => {
                const newErrors = {...errors};
                delete newErrors.previewImage;
                return newErrors
            })
        }
    };

    return (
        <div id="recipe-form-wrapper">
            {edit ? <h1>Edit your recipe</h1> : <h1>Submit your recipe</h1>}
            <form id="recipe-form" onSubmit={handleFormSubmit}>
                <div className="recipe-form-field-wrapper">
                  <label for="recipe-form-title">Title{submitted && errors.title ? <span className="recipe-form-error">{errors.title}</span> : ''}</label>
                  <input type="text" id="recipe-form-title" value={title} onChange={handleChangeTitle}/>
                </div>
                <div className="recipe-form-field-wrapper">
                  <label for="recipe-form-description">Description{submitted && errors.description ? <span className="recipe-form-error">{errors.description}</span> : ''}</label>
                  <textarea id="recipe-form-description" value={description} onChange={handleChangeDescription}/>
                </div>
                <div className="recipe-form-field-wrapper">
                  <label for="recipe-form-ingredients">{"Ingredients (newline-separated)"}{submitted && errors.ingredients ? <span className="recipe-form-error">{errors.ingredients}</span> : ''}</label>
                  <textarea id="recipe-form-ingredients" value={ingredients} onChange={handleChangeIngredients}/>
                </div>
                <div className="recipe-form-field-wrapper">
                  <label for="recipe-form-steps">{"Steps (newline-separated)"}{submitted && errors.steps ? <span className="recipe-form-error">{errors.steps}</span> : ''}</label>
                  <textarea id="recipe-form-steps" value={steps} onChange={handleChangeSteps}/>
                </div>
                <div className="recipe-form-field-wrapper">
                  <label for="recipe-form-image">Image URL {submitted && errors.previewImage ? <span className="recipe-form-error">{errors.previewImage}</span> : ''}</label>
                  <input type="text" id="recipe-form-image" value={previewImage} onChange={handleChangeImage}/>
                </div>
                <div className="recipe-form-field-wrapper">
                    <button id="recipe-form-submit">Submit</button>
                </div>

            </form>
        </div>
    )
}
