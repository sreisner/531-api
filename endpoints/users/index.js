const users = require('./users');

const createEndpoints = router => {
  users.createEndpoints(router);
};

module.exports = {
  createEndpoints,
};
