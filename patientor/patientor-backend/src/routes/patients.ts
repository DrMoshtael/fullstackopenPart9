import express from 'express';
import patientService from '../services/patientService';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsPublic());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) res.send(patient);
    else res.sendStatus(404);
});

router.post('/', (req, res) => {
    try {
        console.log(req.body);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatient = req.body;
        res.json(newPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

export default router;