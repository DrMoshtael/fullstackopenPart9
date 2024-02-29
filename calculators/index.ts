import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { Args } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const h = Number(req.query.height);
    const w = Number(req.query.weight);
    if (h && w) {
    res.json({
        weight: w,
        height: h,
        bmi: calculateBmi(h,w)
    });}
    else {res.status(400).json({error: 'malformatted parameters'});}
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Args = req.body;
    const daily_exercises: number[] = body.daily_exercises;
    const target: number = body.target;
    if (!daily_exercises || !target) {
        return res.status(404).json({ error: "missing parameters" });
    } else if (!daily_exercises.every((i: number) => typeof(i) === 'number') || typeof(target) !== 'number') {
        return res.status(404).json({ error: "malformatted parameters" });
    } else
        return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3004;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

