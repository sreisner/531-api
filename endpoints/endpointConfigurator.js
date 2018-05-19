const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const login = require('./login');
const register = require('./register');
const users = require('./users');
const templates = require('./templates');
const cycles = require('./cycles');

const configureEndpoints = app => {
  configureMiddleware(app);
  configureRoutes(app);
};

const configureMiddleware = app => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  }

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: true,
      cookie: {
        maxAge: +process.env.SESSION_MAX_AGE,
      },
      name: 'sessionid',
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

const configureRoutes = app => {
  configureUnauthenticatedRoutes(app);
  configureAuthenticatedRoutes(app);
};

const configureUnauthenticatedRoutes = app => {
  const unauthenticatedRouter = express.Router();
  login.createEndpoints(unauthenticatedRouter);
  register.createEndpoints(unauthenticatedRouter);
  templates.createEndpoints(unauthenticatedRouter);
  cycles.createEndpoints(unauthenticatedRouter);
  users.createUnauthenticatedEndpoints(unauthenticatedRouter);

  app.use(unauthenticatedRouter);
};

const configureAuthenticatedRoutes = app => {
  const authenticatedRouter = getAuthenticatedRouter();
  users.createAuthenticatedEndpoints(authenticatedRouter);

  app.use(authenticatedRouter);
};

const getAuthenticatedRouter = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    if (req.isUnauthenticated()) {
      res.status(401).end();
    } else {
      next();
    }
  });

  return router;
};

module.exports = {
  configureEndpoints,
};
