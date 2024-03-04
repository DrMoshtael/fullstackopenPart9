import { HospitalEntry } from '../types';
import Icon from '@mui/material/Icon';

const Hospital: React.FC<{ entry: HospitalEntry, assignDiagnosis: (diag: string) => string | undefined }> = ({ entry, assignDiagnosis }) => {


    return (
        <div>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <p>{entry.date}<Icon>local_hospital</Icon> </p>
            <p><i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(d => (
                    <li key={d}>{d} {assignDiagnosis(d)}</li>
                ))}
            </ul>
            <p>Discharged on {entry.discharge.date}</p>
            <p>Discharge criteria: {entry.discharge.criteria}</p>
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    );
};

export default Hospital;