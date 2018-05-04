const passport = require('passport');

const createEndpoints = app => {
    app.route('/user/:userId/training-maxes')
        .get((req, res) => {
            res.json({
                squat: 315
            });
        });
};

module.exports = {
    createEndpoints
};