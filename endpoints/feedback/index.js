const feedback = require('./feedback');

const createEndpoints = router => {
  feedback.createEndpoints(router);
};

module.exports = { createEndpoints };
