const passport = require('passport');
const { User } = require('../../db/models');

const createEndpoints = router => {
  router.route('/register').post((req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .send('An unknown error occurred.  Please try again later.');
      }

      if (user) {
        return res.status(409).send(`User ${user.email} already exists`);
      }

      const newUser = new User({
        email,
        password,
      });

      newUser.save((err, newUser) => {
        if (err) {
          return next('An unknown error occurred');
        }

        res.json(newUser);
      });
    });
  });
};

module.exports = {
  createEndpoints,
};
