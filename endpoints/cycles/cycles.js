const { Cycle } = require('../../db/models');

const createEndpoints = router => {
  router.route('/cycles/:cycleId').get((req, res) => {
    const cycleId = req.params.cycleId;

    Cycle.findById(cycleId, (err, cycle) => {
      if (err) throw err;

      res.json(cycle);
    });
  });

  router
    .route('/cycles/:cycleId/sessions/:sessionId')
    .get((req, res) => {
      const { cycleId, sessionId } = req.params;

      Cycle.findById(cycleId, (err, cycle) => {
        if (err) throw err;

        res.json(cycle.sessions.find(session => session.id === sessionId));
      });
    })
    .patch((req, res) => {
      const { cycleId, sessionId } = req.params;

      Cycle.findById(cycleId, (err, cycle) => {
        if (err) throw err;

        const session = cycle.sessions.find(
          session => session.id === sessionId
        );

        Object.entries(req.body).forEach(keyValue => {
          const [key, value] = keyValue;
          session[key] = value;
        });

        cycle.save((err, cycle) => {
          res.status(204).send();
        });
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
