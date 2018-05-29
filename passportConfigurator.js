const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { User } = require('./db/models');

const configurePassport = app => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      (email, password, done) => {
        const filter = { email };
        const callback = (err, user) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          if (user.password !== password) {
            return done(null, false);
          }

          return done(null, {
            id: user.id,
            email: user.email,
          });
        };

        User.findOne(filter, callback);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user.toObject()))
  );
};

module.exports = {
  configurePassport,
};
