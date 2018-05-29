const cycles = require('./cycles');
const generate = require('./generate');

const createEndpoints = router => {
  generate.createEndpoints(router);
  cycles.createEndpoints(router);
};

module.exports = { createEndpoints };
