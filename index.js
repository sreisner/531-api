const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', passport.authenticate('local'), (res, req) => {

});

app.listen(3001, () => console.log('Running...'));