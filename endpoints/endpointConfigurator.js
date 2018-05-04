const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const login = require('./login');
const register = require('./register');
const trainingMaxes = require('./trainingMaxes');

const configureEndpoints = app => {
    if (process.env.NODE_ENV !== 'production') {
        app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }));
    }

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: +process.env.SESSION_MAX_AGE
        },
        name: 'sessionid'
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    
    const unauthorizedEndpoints = express.Router();
    login.createEndpoints(unauthorizedEndpoints);
    register.createEndpoints(unauthorizedEndpoints);
    
    const authorizedEndpoints = express.Router();
    authorizedEndpoints.use((req, res, next) => {
        if (req.isUnauthenticated()) {
            res.status(401);
            return next('Unauthorized');
        }

        return next();
    });

    trainingMaxes.createEndpoints(authorizedEndpoints);

    app.use(unauthorizedEndpoints, authorizedEndpoints);
};

module.exports = {
    configureEndpoints
};