const passport = require('passport');
const bcrypt = require('bcrypt');
const { Feedback } = require('../../db/models');

const isValid = data => {
  const { satisfaction, feedbackType, comments } = data;

  return (
    satisfaction >= 0 &&
    satisfaction <= 4 &&
    ['Feature Request', 'Bug', 'Inaccurate Template', 'Other'].includes(
      feedbackType
    ) &&
    comments.length > 0
  );
};

const createEndpoints = router => {
  router.route('/feedback').post((req, res) => {
    if (!isValid(req.body)) {
      return res.status(400).send('The form is invalid.');
    }

    Feedback.find(
      { userId: req.user._id, createdOn: { $gte: new Date() - 86400000 } },
      (err, docs) => {
        const maxRequests = process.env.MAX_FEEDBACK_REQUESTS_PER_DAY;
        if (docs.length > maxRequests) {
          return res
            .status(400)
            .send(
              `You've exceeded the maximum daily limit of ${maxRequests} ` +
                `feedback requests today.  We limit this number ` +
                `to prevent bots from filling up our database.  If you're ` +
                `not a bot, sorry for the inconvenience.  Feel free to ` +
                `email me personally at shawn.reisner@gmail.com with your ` +
                `feedback.`
            );
        }

        const feedback = new Feedback(req.body);
        feedback.save(err => {
          if (err) {
            throw err;
          }

          res.status(204).send();
        });
      }
    );
  });
};

module.exports = {
  createEndpoints,
};
