import { Patient, Diagnosis, Entry } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import Notify from "./Notify";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Icon from '@mui/material/Icon';

interface Props {
    id: string | null | undefined;
    diagnoses: Diagnosis[];
}

const PatientPage = (props: Props) => {
    const [patient, setPatient] = useState<Patient>();
    const [notification, setNotification] = useState('');
    const [entryForm, setEntryForm] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            if (props.id) {
                const the_patient = await patientService.getOne(props.id);
                setPatient(the_patient);
            }
        };
        fetchPatient();
    }, [props.id, patient]);

    const assignDiagnosis = (dCode: string): string | undefined => {
        const result: Diagnosis | undefined = props.diagnoses.find(diag => diag.code === dCode);
        if (result) return result.name;
    };

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const EntryDetails = (entry: Entry) => {
        switch (entry.type) {
            case "Hospital":
                return <Hospital entry={entry} assignDiagnosis={assignDiagnosis} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcare entry={entry} assignDiagnosis={assignDiagnosis} />;
            case "HealthCheck":
                return <HealthCheck entry={entry} assignDiagnosis={assignDiagnosis} />;
            default:
                return assertNever(entry);
        }
    };

    const entryStyle = {
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 2,
        marginBottom: 10,
        paddingLeft: 10
    };

    const assignEntryForm = () => {
        if (patient) 
            switch (entryForm) {
                case 'HealthCheck':
                    return <HealthCheckEntryForm setNotification={setNotification} id={patient.id} />;
                case 'Hospital':
                    return <HospitalEntryForm setNotification={setNotification} id={patient.id} />;
                case 'OccupationalHealthcare':
                    return <OccupationalHealthcareEntryForm setNotification={setNotification} id={patient.id} />;
                default:
                    return null;
            }
    };

    const handleEntrySelection = (_event: React.MouseEvent<HTMLElement>, entryType: string | null) => {
        setEntryForm(entryType);
    };

    if (patient)
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <h2>{patient.name}</h2>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <div>gender: {patient.gender}</div>
                <div>DOB: {patient.dateOfBirth}</div>
                <Notify notification={notification} />
                <ToggleButtonGroup value={entryForm} onChange={handleEntrySelection} exclusive>
                    <ToggleButton value='Hospital'>
                        <Icon>local_hospital</Icon>
                    </ToggleButton>
                    <ToggleButton value='HealthCheck'>
                        <Icon>medical_services</Icon>
                    </ToggleButton>
                    <ToggleButton value='OccupationalHealthcare'>
                        <Icon>work</Icon>
                    </ToggleButton>
                </ToggleButtonGroup>
                {assignEntryForm()}
                <h3>Entries</h3>
                {patient.entries.map(e => (
                    <div key={e.id} style={entryStyle}>
                        {EntryDetails(e)}
                    </div>
                ))}
            </div>
        );
};

export default PatientPage;