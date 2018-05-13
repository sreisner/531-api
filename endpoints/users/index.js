const createEndpoints = router => {
  router.route('/users/:userId').get((req, res) => {
    if (req.params.userId === 'current') {
      res.json(req.user).end();
    }
  });

  router.route('/users/:userId/training-maxes').get((req, res) => {
    res.json({
      squat: 225.5,
      deadlift: 243.5,
      bench: 180.5,
      press: 117.5,
    });
  });
};

module.exports = {
  createEndpoints,
};
