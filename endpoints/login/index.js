const passport = require('passport');

const createEndpoints = router => {
  router.route('/login').post(passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });

  router.route('/logout').get((req, res) => {
    req.logout();
    res.json({});
  });
};

module.exports = {
  createEndpoints,
};
