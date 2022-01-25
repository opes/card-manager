import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createCard, getCard, updateCard } from '../services/cards';
import Form from '../components/Form';


export default function EditCard() {
    const [oldCard, setOldCard] = useState('')
    const { id } = useParams()

    useEffect(() => {
        const fetchCard = async () => {
            if (id !== 'new') {
                try {
                    const [cardData] = await getCard(id)
                    setOldCard(cardData)
                } catch (error) {
                    console.log(error.message)
                }
            }
        }
        fetchCard(id)
    }, [id])

    return (
        <>
            <nav>
                <Link to='/'>Back to Dashboard</Link>
            </nav>
            {oldCard && <Form handleCard={updateCard} cardData={oldCard} />}
            {!oldCard && <Form handleCard={createCard} cardData={''} />}
        </>
    )
}
