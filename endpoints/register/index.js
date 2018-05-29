const register = require('./register');

const createEndpoints = router => {
  register.createEndpoints(router);
};

module.exports = { createEndpoints };
