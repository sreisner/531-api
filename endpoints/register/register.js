const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

const emailContainsExactlyOneAtSign = email =>
  email.split('').reduce((acc, curr) => (curr === '@' ? ++acc : acc), 0) === 1;

const createEndpoints = router => {
  router.route('/register').post((req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (password.length < 8) {
      return res
        .status(400)
        .send('Password must be at least 8 characters long');
    }

    if (!emailContainsExactlyOneAtSign(email)) {
      return res.status(400).send('The email you entered is invalid');
    }

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
          firstName,
          lastName,
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
