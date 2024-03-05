import { useState, SyntheticEvent } from "react";
import patientService from '../services/patients';
import axios from "axios";
import { NewEntry, HealthCheckRating } from "../types";
import { MenuItem, Select, Input, InputLabel, Button, TextField } from "@mui/material";
import diagnosisData from '../../../patientor-backend/data/diagnoses';

interface Props {
    id: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>
}

const HealthCheckEntryForm = ({ id, setNotification }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [diagCodes, setDiagCodes] = useState<Array<string>>([]);

    const handleNewEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        const newEntry: NewEntry = {
            type: 'HealthCheck',
            description,
            date,
            specialist,
            healthCheckRating: Number(rating),
            diagnosisCodes: diagCodes
        };
        console.log(newEntry);
        try {
            const result = await patientService.postEntry(id, newEntry);
            console.log('res', result);
            console.log('ty', typeof (date), typeof (diagCodes));
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
        setDiagCodes([]);
    };

    const formStyle = {
        borderStyle: 'dotted',
        borderRadius: 5,
        borderWidth: 2,
        marginBottom: 10,
        marginTop:10,
        paddingLeft: 10
    };

    return (
        <div style={formStyle}>
            <h3>New HealthCheck entry</h3>
            <form onSubmit={handleNewEntry}>
                <div>
                    <InputLabel id='description'>Description</InputLabel>
                    <TextField required id='description' value={description} onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div>
                    <InputLabel id='date'>Date</InputLabel>
                    <Input required id='date' type='date' value={date} onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                    <InputLabel id='specialist'>specialist</InputLabel>
                    <TextField required id='specialist' value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
                </div>
                <div>
                    <InputLabel id='diag'>Diagnosis codes</InputLabel>
                    <Select labelId='diag' multiple value={diagCodes} onChange={({ target: { value } }) => setDiagCodes(value as string[])}>
                        {
                            diagnosisData.map(d =>
                                <MenuItem key={d.code} value={d.code}>{d.code}</MenuItem>)
                        }

                    </Select>
                </div>
                <div>
                    <InputLabel id='rating'>Healthcheck rating</InputLabel>
                    <Select required label='Rating' labelId='rating' value={rating} onChange={({ target }) => setRating(target.value)}>
                        {Object.entries(HealthCheckRating)
                            .filter(([_name, value]) => typeof value === 'number')
                            .map(([name, value]) => {
                                return <MenuItem key={value} value={value}>{name}: {value}</MenuItem>;
                            }
                            )}
                    </Select>
                </div>
                <Button type='submit'>Add</Button>
            </form>
        </div>
    );
};

export default HealthCheckEntryForm;