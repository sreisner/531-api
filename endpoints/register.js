const passport = require('passport');
const { User } = require('../models');

const createEndpoints = app => {
    app.route('/register')
        .post((req, res, next) => {
            const { email, password } = req.body;

            User.findOne({ email }, (err, user) => {
                if (err) {
                    return next('An unknown error occurred');
                }

                if (user) {
                    return next(`User ${user.email} already exists`);
                }

                const newUser = new User({
                    email,
                    password
                });

                newUser.save((err, newUser) => {
                    if (err) {
                        return next('An unknown error occurred');
                    }

                    res.json(newUser);
                });
            });
        });
};

module.exports = {
    createEndpoints
};