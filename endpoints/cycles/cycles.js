const { Cycle } = require('../../db/models');

const createEndpoints = router => {
  router.route('/cycles/:cycleId').get((req, res) => {
    const cycleId = req.params.cycleId;

    Cycle.findById(cycleId, (err, cycle) => {
      if (err) throw err;

      res.json(cycle);
    });
  });

  router.route('/cycles').post((req, res) => {
    const cycle = new Cycle(req.body);

    cycle.save((err, cycle) => {
      if (err) throw err;

      res.json(cycle._id);
    });
  });
};

module.exports = {
  createEndpoints,
};
