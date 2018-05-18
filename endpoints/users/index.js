const { User } = require('../../db/models');

const createEndpoints = router => {
  router.route('/users/:userId').get((req, res) => {
    if (req.params.userId === 'current') {
      res.json(req.user).end();
    }
  });

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
};

module.exports = {
  createEndpoints,
};
