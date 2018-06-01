const { Cycle } = require('../../db/models');

const createEndpoints = router => {
  router.route('/cycles/:cycleId').get((req, res) => {
    const cycleId = req.params.cycleId;

    Cycle.findById(cycleId, (err, cycle) => {
      if (err) throw err;

      res.json(cycle);
    });
  });

  router.route('/cycles/:cycleId/sessions/:sessionId').get((req, res) => {
    const { cycleId, sessionId } = req.params;

    Cycle.findById(cycleId, (err, cycle) => {
      if (err) throw err;

      res.json(
        cycle.sessions
          .reduce((acc, curr) => [...acc, ...curr], [])
          .find(session => session.id === sessionId)
      );
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
