import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import styles from '../App.css'
import { deleteCardById } from '../services/cards';
import { motion } from 'framer-motion';

export default function Form({ handleCard, cardData }) {
    const history = useHistory()

    const [title, setTitle] = useState(cardData.title || '')
    const [definition, setDefinition] = useState(cardData.definition || '')
    const [category, setCategory] = useState(cardData.category || '')
    const [animal, setAnimal] = useState(cardData.animal || '')
    const [source, setSource] = useState(cardData.source || '')
    const [formError, setFormError] = useState('')

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        // If you wanted to remove the duplication,
        // you could have the form's state be an object,
        // with each entry being:
        //   [event.target.name]: event.target.value
        if (name === 'title') setTitle(value.toLowerCase())
        if (name === 'definition') setDefinition(value)
        if (name === 'category') setCategory(value)
        if (name === 'animal') setAnimal(value)
        if (name === 'source') setSource(value)
    }

    const newCardData = {
        title,
        id: cardData.id,
        definition,
        source,
        category,
        animal
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await handleCard(newCardData)
            console.log('Added this to the db: ' + newCardData)
            history.replace('/')
        } catch (error) {
            console.log(error)
            setFormError(error)
        }
    }

    const handleDelete = async () => {
        const idToDelete = cardData.id
        const confirmation = confirm('Are you SURE you want to delete this card from the db??')
        if (confirmation) {
            try {
                await deleteCardById(idToDelete)
                history.replace('/')
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const animalIcons = ['axolotl', 'bear', 'bunny', 'chameleon', 'chick', 'deer', 'dinosaur', 'dog', 'frog', 'giraffe', 'hedgehog', 'lion', 'llama', 'octopus', 'raccoon', 'rat', 'sheep', 'shrimp', 'tiger', 'turtle']
    const imgVariants = {
        initial: { rotate: -180, opacity: 0 },
        animate: { rotate: 0, opacity: 1, transition: { duration: 1 } },
        hover: { x: [0, 10, 0], transition: { yoyo: 10 } }
    }

    return (
        <div className={styles.formpreviewcontainer}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Card</legend>
                    <section>
                        <label htmlFor="title">Title</label>
                        <input
                            required
                            id="title"
                            type="name"
                            name="title"
                            value={title}
                            onChange={handleFormChange}
                        />
                    </section>

                    <section>
                        <label htmlFor="category">Category</label>
                        <select
                            required
                            id="category"
                            type="text"
                            name="category"
                            value={category}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Category</option>
                            <option value="pronoun">Pronoun</option>
                            <option value="gender">Gender</option>
                        </select>
                    </section>

                    <section>
                        <label htmlFor="definition">Definition</label>
                        <textarea
                            required
                            id="definition"
                            type="text"
                            name="definition"
                            value={definition}
                            onChange={handleFormChange}
                        />
                    </section>

                    <section>
                        <label htmlFor="source">Definition Source URL</label>
                        <input
                            id="source"
                            type="name"
                            name="source"
                            value={source}
                            onChange={handleFormChange}
                        />
                    </section>

                    <section>
                        <p>Before selecting an animal, please review the existing deck to ensure one animal is not being overused :)</p>
                        <label htmlFor="animal">Animal</label>
                        <select
                            required
                            id="animal"
                            type="animal"
                            name="animal"
                            value={animal}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Animal</option>
                            {animalIcons.map((animal) =>
                                <option key={animal} value={animal}>{animal}</option>)
                            }
                        </select>

                    </section>
                    <p>**Please doublecheck the preview before clicking submit**</p>
                    <button type='submit'>Submit to DB</button>
                    {formError && <p>{formError}</p>}
                    {cardData && <button className={styles.delete} onClick={handleDelete}>Delete {title} from DB</button>}

                </fieldset>

            </form>

            <article>
                <h3>Card Preview</h3>
                {category && <p>This card will appear in the {category} deck based on current category selection.</p>}
                <div className={styles.cardpreview}>
                    <h2>{title}</h2>
                    <p>{definition}</p>
                    {source && <Link to={source}><p>Source</p></Link>}
                    {animal && <motion.img variants={imgVariants} initial={'initial'} animate={'animate'} whileHover={'hover'} src={require(`../assets/icons/${animal}.png`)} alt={animal} />}
                </div>
            </article>
        </div>
    )
}
