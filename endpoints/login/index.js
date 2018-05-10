const passport = require('passport');

const createEndpoints = router => {
  router.route('/login').post(passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });
};

module.exports = {
  createEndpoints,
};
