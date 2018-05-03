const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const configurePassport = () => {
    passport.use(
        new LocalStrategy(
            (username, password, done) => {

            }));
};