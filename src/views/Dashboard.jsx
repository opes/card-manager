import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCard, getCardbyTitle, getCards } from "../services/cards"
import styles from '../App.css'

export default function Dashboard() {
    const [cards, setCards] = useState([])
    const [queryId, setQueryId] = useState('')
    const [queryTitle, setQueryTitle] = useState('')
    const [results, setSearchResults] = useState('')

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const allCards = await getCards()
                setCards(allCards)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchCards()
    }, [])

    useEffect(() => {
        const fetchById = async () => {
            try {
                if (queryId) {
                    const res = await getCard(queryId)
                    setSearchResults(res)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchById()
    }, [queryId])

    useEffect(() => {
        const fetchByTitle = async () => {
            try {
                if (queryTitle) {
                    const res = await getCardbyTitle(queryTitle)
                    setSearchResults(res)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchByTitle()
    }, [queryTitle])

    return (
        <main>
            <section>
                <h3>New</h3>
                <Link to='/card/new'><button>Create New Card</button></Link>
            </section>
            <section>
                <h3>Existing</h3>
                {cards.length == 0 && <span>This DB is so empty!</span>}
                <ul>
                    {cards.length > 0 && cards.map((card) => (
                        <li key={card.id}>
                            {card.title}
                            <Link to={`/card/${card.id}`}><button>Edit</button></Link>
                        </li>
                    ))}
                </ul>
            </section>
            <section className={styles.search}>
                <h3>Search</h3>
                <div>
                    <label htmlFor='id'>By ID</label>
                    <input id='id' type='number' name='id' value={queryId} onChange={((e) => setQueryId(e.target.value))} />
                </div>
                <div>
                    <label htmlFor='title'>By Title</label>
                    <input id='title' type='text' name='title' value={queryTitle} onChange={((e) => setQueryTitle(e.target.value))} />
                </div>
                <h4>Results</h4>
                {!results && <span>Enter a search term above.</span>}
                <ul>
                    {results && results.map((card) =>
                        <li key={card.id}>
                            {card.title}
                            <Link to={`/card/${card.id}`}><button>Edit</button></Link>
                        </li>)}
                </ul>
            </section>
        </main>
    )
}
