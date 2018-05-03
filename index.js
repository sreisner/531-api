const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/training-maxes', (req, res) => res.json({
    press: 135,
    bench: 225,
    squat: 315,
    deadlift: 405
}));

app.listen(3001, () => console.log('Running...'));