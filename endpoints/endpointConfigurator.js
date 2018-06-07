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
const feedback = require('./feedback');

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
  login.createEndpoints(app);
  register.createEndpoints(app);
  templates.createEndpoints(app);
  cycles.createEndpoints(app);
  users.createEndpoints(app);

  const authenticatedRouter = getAuthenticatedRouter();
  feedback.createEndpoints(authenticatedRouter);

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
