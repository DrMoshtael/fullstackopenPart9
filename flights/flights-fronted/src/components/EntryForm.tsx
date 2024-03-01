import { useState } from 'react';
import diaryService from '../services/diaryService';
import axios from 'axios';

const EntryForm = ({setNotification}:{setNotification: React.Dispatch<React.SetStateAction<string>>}) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')

    const handleEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            await diaryService.postEntry({date, weather, visibility, comment})
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response) setNotification(error.response.data)
                else setNotification(error.message)
                setTimeout(() => setNotification(''), 3000)
            }
        }
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
                    <input type='date' value={date} id='date' onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                    visibility
                    great<input type='radio' name='visibility' onChange={() => setVisibility('great')}/>
                    good<input type='radio' name='visibility' onChange={() => setVisibility('good')}/>
                    ok<input type='radio' name='visibility' onChange={() => setVisibility('ok')}/>
                    poor<input type='radio' name='visibility' onChange={() => setVisibility('poor')}/>
                </div>
                <div>
                   weather
                    sunny<input type='radio' name='weather' onChange={() => setWeather('sunny')} />
                    rainy<input type='radio' name='weather' onChange={() => setWeather('rainy')} />
                    cloudy<input type='radio' name='weather' onChange={() => setWeather('cloudy')} />
                    stormy<input type='radio' name='weather' onChange={() => setWeather('stormy')} />
                    windy<input type='radio' name='weather' onChange={() => setWeather('windy')} />
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