import { OccupationalHealthcareEntry } from "../types";
import Icon from '@mui/material/Icon';


const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry, assignDiagnosis: (diag: string) => string | undefined }> = ({ entry, assignDiagnosis }) => {

    return (
        <div>
            <p>{entry.date}<Icon>work</Icon><i>{entry.employerName}</i> </p>
            <p><i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(d => (
                    <li key={d}>{d} {assignDiagnosis(d)}</li>
                ))}
            </ul>
            {entry.sickLeave && <p>Sick leave granted between {entry.sickLeave?.startDate} and {entry.sickLeave?.endDate}</p>}
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    );
};

export default OccupationalHealthcare;