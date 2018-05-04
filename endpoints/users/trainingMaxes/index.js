const passport = require('passport');

const createEndpoints = router => {
    router.route('/training-maxes')
        .get((req, res) => {
            res.json({
                squat: 315
            });
        });
};

module.exports = {
    createEndpoints
};