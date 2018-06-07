const passport = require('passport');
const bcrypt = require('bcrypt');
const { Feedback } = require('../../db/models');

const createEndpoints = router => {
  router.route('/feedback').post((req, res) => {
    const feedback = new Feedback(req.body);
    feedback.save(err => {
      if (err) {
        throw err;
      }

      res.status(204).send();
    });
  });
};

module.exports = {
  createEndpoints,
};
