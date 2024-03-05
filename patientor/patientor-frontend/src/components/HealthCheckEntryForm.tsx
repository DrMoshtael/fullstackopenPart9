import { useState, SyntheticEvent } from "react";
import patientService from '../services/patients';
import axios from "axios";
import { NewEntry } from "../types";

interface Props {
    id: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>
}

const HealthCheckEntryForm = ({ id, setNotification }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [diagCodes, setDiagCodes] = useState('');

    const handleNewEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        const newEntry: NewEntry = {
            type: 'HealthCheck',
            description,
            date,
            specialist,
            healthCheckRating: Number(rating),
            diagnosisCodes: [diagCodes]
        };
        console.log(newEntry);
        try {
            const result = await patientService.postEntry(id, newEntry);
            console.log('res', result);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                if (error.response) setNotification(error.response.data);
                else setNotification(error.message);
                setTimeout(() => setNotification(''), 3000);
            }
        }

        setDescription('');
        setDate('');
        setSpecialist('');
        setRating('');
        setDiagCodes('');
    };

    return (
        <div>
            <h3>New HealthCheck entry</h3>
            <form onSubmit={handleNewEntry}>
                <div>
                    Description
                    <input value={description} onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div>
                    Date
                    <input value={date} onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                    Specialist
                    <input value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
                </div>
                <div>
                    Healthcheck rating
                    <input value={rating} onChange={({ target }) => setRating(target.value)} />
                </div>
                <div>
                    Diagnosis codes
                    <input value={diagCodes} onChange={({ target }) => setDiagCodes(target.value)} />
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    );
};

export default HealthCheckEntryForm;