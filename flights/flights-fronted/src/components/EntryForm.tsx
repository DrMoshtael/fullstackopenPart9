import { useState } from 'react';
import diaryService from '../services/diaryService';

const EntryForm = () => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')

    const handleEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        await diaryService.postEntry({date, weather, visibility, comment})
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
    }

    return (
        <div>
            <h2>Add new entry</h2>

            <form onSubmit={handleEntry}>
                <div>
                    <label htmlFor='date'>date</label>
                    <input value={date} id='date' onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                    <label htmlFor='visibility'>visibility</label>
                    <input value={visibility} id='visibility' onChange={({ target }) => setVisibility(target.value)} />
                </div>
                <div>
                    <label htmlFor='weather'>weather</label>
                    <input value={weather} id='weather' onChange={({ target }) => setWeather(target.value)} />
                </div>
                <div>
                    <label htmlFor='comment'>comment</label>
                    <input value={comment} id='comment' onChange={({ target }) => setComment(target.value)} />
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default EntryForm