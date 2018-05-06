const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const login = require('./login');
const register = require('./register');
const users = require('./users');

const configureEndpoints = app => {
    configureMiddleware(app);
    configureUnauthenticatedRoutes(app);
    configureAuthenticatedRoutes(app);
};

const configureMiddleware = app => {
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
};

/*
    Routes that do not require a session
*/
const configureUnauthenticatedRoutes = app => {
    const router = express.Router();

    login.createEndpoints(router);
    register.createEndpoints(router);

    app.use(router);
};

/*
    Routes that require a valid session
*/
const configureAuthenticatedRoutes = app => {
    const router = express.Router();

    router.use((req, res, next) => {
        if (req.isUnauthenticated()) {
            res.status(401).end();
        } else {
            next();
        }
    });
    
    users.createEndpoints(router);
    
    app.use(router);
};

module.exports = {
    configureEndpoints
};