import patientData from "../../data/patients";
import { NewPatient, PatientPublic, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatientsPublic = (): PatientPublic[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const findById = (id: string): Patient | undefined => {
    const entry = patientData.find(p => p.id === id);
    return entry;
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
        id,
        entries: [], //temp
        ...entry
    };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatientsPublic,
    addPatient,
    findById
};