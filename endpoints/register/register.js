const passport = require('passport');
const bcrypt = require('bcrypt');
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

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .send('An unknown error occurred.  Please try again later.');
        }
        const newUser = new User({
          email,
          password: hashedPassword,
        });

        newUser.save((err, newUser) => {
          if (err) {
            return res
              .status(500)
              .send('An unknown error occurred.  Please try again later.');
          }

          res.json(newUser);
        });
      });
    });
  });
};

module.exports = {
  createEndpoints,
};
