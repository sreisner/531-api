const passport = require('passport');

const createEndpoints = app => {
    app.route('/user/:userId/training-maxes')
        .get(passport.authenticate('local'), (req, res) => {
            res.json({
                squat: 315
            });
        });
};

module.exports = {
    createEndpoints
};