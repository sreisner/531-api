const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users/:userId', (req, res) => {
    res.json({
        userId: 123
    });
});

app.get('/training-maxes', (req, res) => res.json({
    press: 135,
    bench: 225,
    squat: 315,
    deadlift: 405
}));

app.listen(3001, () => console.log('Running...'));