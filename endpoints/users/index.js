const express = require('express');

const createEndpoints = router => {
    router.route('/users/:userId')
        .get((req, res) => {
            if (req.params.userId === 'current') {
                res.json(req.user).end();
            }
        })

    router.route('/users/:userId/training-maxes')
        .get((req, res) => {
            res.json({
                squat: 315
            });
        });
};

module.exports = {
    createEndpoints
};