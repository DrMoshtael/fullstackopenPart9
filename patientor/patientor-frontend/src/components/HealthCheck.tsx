import { HealthCheckEntry } from '../types';
import Icon from '@mui/material/Icon';

const HealthCheck: React.FC<{ entry: HealthCheckEntry, assignDiagnosis: (diag: string) => string | undefined }> = ({ entry, assignDiagnosis }) => {
    
    const assignRatingColor = (rating: number): string => {
        switch (rating) {
            case 0:
                return 'green';
            case 1: 
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return 'black';
        }
    };
    
    return (
        <div>
            <p>{entry.date}<Icon>medical_services</Icon> </p>
            <p><i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(d => (
                    <li key={d}>{d} {assignDiagnosis(d)}</li>
                ))}
            </ul>
            <p><Icon sx={{ color: assignRatingColor(entry.healthCheckRating) }}>favorite</Icon></p>
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    );
};

export default HealthCheck;