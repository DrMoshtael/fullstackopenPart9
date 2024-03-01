import { NonSensitiveDiaryEntry } from "../types"

const Diary = ({entries}: {entries: NonSensitiveDiaryEntry[]}) => {

    return (
        <div>
            <h2>Diary</h2>
            {entries.map((e, index) => (
                <div key={index}>
                    <h3>{e.date}</h3>
                    <div>Visibility: {e.visibility}</div>
                    <div>Weather: {e.weather}</div>
                </div>
            ))}

        </div>
    )
}

export default Diary