const { User, Cycle } = require('../../db/models');

const createEndpoints = router => {
  router.route('/users/me').get((req, res) => {
    if (req.user) {
      const { password, ...data } = req.user;
      res.json(data);
    } else {
      res.status(204).end();
    }
  });

  router
    .route('/users/me/current-cycle')
    .get((req, res) => {
      if (req.user.currentCycleId) {
        Cycle.findById(req.user.currentCycleId, (err, cycle) => {
          res.json(cycle);
        });
      } else {
        res.status(204).end();
      }
    })
    .put((req, res) => {
      const currentCycleId = req.body.cycleId;

      User.findById(req.user._id, (err, user) => {
        user.currentCycleId && user.previousCycleIds.push(user.currentCycleId);

        user.currentCycleId = currentCycleId;

        user.save(err => {
          if (err) throw err;

          res.status(204).end();
        });
      });
    });
};

module.exports = {
  createEndpoints,
};
