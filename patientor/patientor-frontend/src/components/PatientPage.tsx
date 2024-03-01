import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

interface Props {
    id: string | null | undefined;
    diagnoses: Diagnosis[];
}

const PatientPage = (props: Props) => {
    const [patient, setPatient] = useState<Patient>();
    useEffect(() => {
        const fetchPatient = async () => {
            if (props.id) {
                const the_patient = await patientService.getOne(props.id);
                setPatient(the_patient);
            }
        };
        fetchPatient();
    }, [props.id]);

    const assignDiagnosis = (dCode: string) => {
        const result: Diagnosis | undefined = props.diagnoses.find(diag => diag.code === dCode);
        if (result) return result.name;
    };

    if (patient)
        return (
            <div>
                <h2>{patient.name}</h2>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <div>gender: {patient.gender}</div>
                <div>DOB: {patient.dateOfBirth}</div>
                <h3>Entries</h3>
                {patient.entries.map(e => (
                    <div key={e.id}>
                        <p>{e.date} <i>{e.description}</i></p>
                        <ul>
                            {e.diagnosisCodes && e.diagnosisCodes.map(d => (
                                <li key={d}>{d} {assignDiagnosis(d)}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
};

export default PatientPage;