import { Patient, Diagnosis, Entry } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import Notify from "./Notify";

interface Props {
    id: string | null | undefined;
    diagnoses: Diagnosis[];
}

const PatientPage = (props: Props) => {
    const [patient, setPatient] = useState<Patient>();
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchPatient = async () => {
            if (props.id) {
                const the_patient = await patientService.getOne(props.id);
                setPatient(the_patient);
            }
        };
        fetchPatient();
    }, [props.id]);

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
                <HealthCheckEntryForm id={patient.id} />
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