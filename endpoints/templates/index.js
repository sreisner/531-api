const templates = require('./templates');

const createEndpoints = router => {
  templates.createEndpoints(router);
};

module.exports = { createEndpoints };
