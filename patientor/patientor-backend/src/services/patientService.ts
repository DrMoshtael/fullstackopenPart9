import patientData from "../../data/patients";
import { PatientPublic } from "../types";

const getPatientsPublic = (): PatientPublic[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatientsPublic
};