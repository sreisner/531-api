const express = require('express');

const createEndpoints = router => {
  router.route('/users/:userId').get((req, res) => {
    if (req.params.userId === 'current') {
      res.json(req.user).end();
    }
  });

  router.route('/users/:userId/training-maxes').get((req, res) => {
    res.json({
      squat: 315,
      deadlift: 405,
      bench: 225,
      press: 135
    });
  });
};

module.exports = {
  createEndpoints
};
