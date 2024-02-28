import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

