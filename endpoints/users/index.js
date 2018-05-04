const express = require('express');
const trainingMaxes = require('./trainingMaxes');

const createEndpoints = router => {
    const userRouter = express.Router();

    trainingMaxes.createEndpoints(userRouter);

    router.use('/users/:userId', userRouter);
};

module.exports = {
    createEndpoints
};