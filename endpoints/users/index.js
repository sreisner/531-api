const { User } = require('../../db/models');

const createAuthenticatedEndpoints = router => {
  router
    .route('/users/:userId/training-maxes')
    .get((req, res) => {
      let userId =
        req.params.userId === 'current' ? req.user.id : req.params.userId;

      User.findById(userId, 'trainingMaxes', (err, user) => {
        res.json(user.trainingMaxes || {});
      });
    })
    .put((req, res) => {
      let userId =
        req.params.userId === 'current' ? req.user.id : req.params.userId;

      User.findById(userId, (err, user) => {
        user.trainingMaxes = req.body;
        user.save(err => {
          if (err) throw err;

          res.send({});
        });
      });
    });

  router.route('/users/:userId/cycles/current').put((req, res) => {
    let userId =
      req.params.userId === 'current' ? req.user.id : req.params.userId;

    User.findById(userId, (err, user) => {
      user.currentCycle = req.body;

      user.save(err => {
        if (err) throw err;

        res.send({});
      });
    });
  });
};

const createUnauthenticatedEndpoints = router => {
  router.route('/users/current').get((req, res) => {
    res.json(req.user || {}).end();
  });
};

module.exports = {
  createUnauthenticatedEndpoints,
  createAuthenticatedEndpoints,
};
