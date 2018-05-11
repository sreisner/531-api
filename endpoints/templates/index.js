const { Template } = require('../../db/models');
const config = require('./config');

const createEndpoints = router => {
  router.route('/templates').get((req, res) => {
    Template.find((err, templates) => res.json(templates));
  });

  config.createEndpoints(router);
};

module.exports = {
  createEndpoints,
};
