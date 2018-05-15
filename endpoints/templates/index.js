const { Template } = require('../../db/models');

const createEndpoints = router => {
  router.route('/templates').get((req, res) => {
    Template.find((err, templates) => res.json(templates));
  });
};

module.exports = {
  createEndpoints,
};
