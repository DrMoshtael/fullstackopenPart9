import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
    if (!isString(text)) throw new Error('Incorrect or missing field');
    return text;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) throw new Error ('Invalid gender: ' + gender);
    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object 
        && 'occupation' in object && 'ssn' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseString(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            ssn: parseString(object.ssn)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: a field is missing');
};

export default toNewPatient;