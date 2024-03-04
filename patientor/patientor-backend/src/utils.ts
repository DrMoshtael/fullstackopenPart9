import { NewPatient, Gender, Diagnosis, NewEntry, Discharge, SickLeave, BaseEntry, HealthCheckRating } from "./types";

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
    if (!isString(gender) || !isGender(gender)) throw new Error('Invalid gender: ' + gender);
    return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    // if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    //     // we will just trust the data to be in correct form
    //     return [] as Array<Diagnosis['code']>;
    // }
    return object as Array<Diagnosis['code']>;
};

//   const isDischarge = (object: object): object is Discharge => {
//     return Object.keys(object).every(key => Object.keys(Discharge).includes(key)); 
//   }

const parseDischarge = (discharge: unknown): Discharge => {
    return discharge as Discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    return sickLeave as SickLeave;
};


const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) throw new Error(`Invalid rating: ${rating}`);
    return rating;
};

// const assertNever = (value: never): never => {
//     throw new Error(
//         `Unhandled discriminated union member: ${JSON.stringify(value)}`
//     );
// };

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        const baseDetails: Omit<BaseEntry, 'id'> = {
            description: parseString(object.description),
            date: parseString(object.date),
            specialist: parseString(object.specialist),
        };
        if ('diagnosisCodes' in object)
            baseDetails['diagnosisCodes'] = parseDiagnosisCodes(object.diagnosisCodes);

        switch (object.type) {
            case 'Hospital': {
                if ('discharge' in object) {
                    const newEntry: NewEntry = {
                        ...baseDetails,
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                    return newEntry;
                }
                else throw new Error('Incorrect data: discharge is missing');
            }
            case 'OccupationalHealthcare': {
                if ('employerName' in object && 'sickLeave' in object) {
                    const newEntry: NewEntry = {
                        ...baseDetails,
                        type: object.type,
                        employerName: parseString(object.employerName),
                        sickLeave: parseSickLeave(object.sickLeave)
                    };
                    return newEntry;
                } else if ('employerName' in object) {
                    const newEntry: NewEntry = {
                        ...baseDetails,
                        type: object.type,
                        employerName: parseString(object.employerName)
                    };
                    return newEntry;
                }
                else throw new Error('Incorrect data: employerName is missing');
            }
            case 'HealthCheck': {
                if ('healthCheckRating' in object) {
                    const newEntry: NewEntry = {
                        ...baseDetails,
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return newEntry;
                }
                else throw new Error('Incorrect data: healthCheckRating is missing');
            }
        }
    } 
    throw new Error('Incorrect or missing data');
};