import { useState, SyntheticEvent } from "react";
import patientService from '../services/patients';
import axios from "axios";
import { NewEntry } from "../types";
import { MenuItem, Select, Input, InputLabel, Button, TextField } from "@mui/material";
import diagnosisData from '../../../patientor-backend/data/diagnoses';

interface Props {
    id: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>
}

const OccupationalHealthcareEntryForm = ({ id, setNotification }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagCodes, setDiagCodes] = useState<Array<string>>([]);
    const [employer, setEmployer] = useState('');
    const [sickStart, setSickStart] = useState('');
    const [sickEnd, setSickEnd] = useState('');


    const handleNewEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        const newEntry: NewEntry = {
            type: 'OccupationalHealthcare',
            description,
            date,
            specialist,
            diagnosisCodes: diagCodes,
            employerName: employer,
            sickLeave: {
                startDate: sickStart,
                endDate: sickEnd
            }
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
        setDiagCodes([]);
        setEmployer('');
        setSickStart('');
        setSickEnd('');
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
            <h3>New Occupational Healthcare entry</h3>
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
                    <InputLabel htmlFor='employer'>Employer name: </InputLabel>
                    <TextField required id='employer' value={employer} onChange={({target}) => setEmployer(target.value)} />
                </div>
                <div>
                    <InputLabel htmlFor='sickStart'>Sick leave start date</InputLabel>
                    <Input type='date' id='sickStart' value={sickStart} onChange={({target}) => setSickStart(target.value)} />
                </div>
                <div>
                    <InputLabel htmlFor='sickEnd'>Sick leave end date</InputLabel>
                    <Input type='date' id='sickEnd' value={sickEnd} onChange={({target}) => setSickEnd(target.value)} />
                </div>
                <Button type='submit'>Add</Button>
            </form>
        </div>
    );
};

export default OccupationalHealthcareEntryForm;