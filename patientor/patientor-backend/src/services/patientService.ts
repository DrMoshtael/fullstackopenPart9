import patientData from "../../data/patients";
import { NewPatient, PatientPublic, Patient, NewEntry, Entry } from "../types";
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

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
        id,
        entries: [], //temp
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
    const entryId = uuid();
    const newEntry: Entry = {
        id: entryId,
        ...entry
    };
    const patient = patientData.find(p => p.id === id);
    if (patient) patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatientsPublic,
    addPatient,
    findById,
    addEntry
};