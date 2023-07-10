const express = require('express');
const { checkActionsId, checkAction, checkActionUpdate } = require('./actions-middlware');
const Action = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(next);
});

router.get('/:id', checkActionsId, (req, res) => {
    res.json(req.action);
});

router.post('/', checkAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(next)
});

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Router is not working!"
    });
});

module.exports = router;
