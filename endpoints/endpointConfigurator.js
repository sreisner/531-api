const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./login');
const register = require('./register');
const trainingMaxes = require('./trainingMaxes');

const configureEndpoints = app => {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: +process.env.SESSION_MAX_AGE
        },
        name: 'sessionid'
    }));

    login.createEndpoints(app);
    register.createEndpoints(app);
    trainingMaxes.createEndpoints(app);
};

module.exports = {
    configureEndpoints
};