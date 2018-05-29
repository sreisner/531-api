const login = require('./login');

const createEndpoints = router => {
  login.createEndpoints(router);
};

module.exports = { createEndpoints };
