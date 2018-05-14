const createEndpoints = router => {
  router.route('/users/:userId').get((req, res) => {
    if (req.params.userId === 'current') {
      res.json(req.user).end();
    }
  });

  router.route('/users/:userId/training-maxes').get((req, res) => {
    res.json({
      squat: 235.5,
      deadlift: 253.5,
      bench: 185.5,
      press: 122.5,
    });
  });
};

module.exports = {
  createEndpoints,
};
