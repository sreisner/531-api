const express = require('express');

const app = express();

app.get('/training-maxes', (req, res) => res.json({
    press: 135,
    bench: 225,
    squat: 315,
    deadlift: 405
}));

app.listen(3001, () => console.log('Running...'));