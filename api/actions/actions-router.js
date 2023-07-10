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

router.put('/:id', checkActionsId, checkActionUpdate, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(updatedAction => {
            res.json(updatedAction);
        })
        .catch(next);
});

router.delete('/:id', checkActionsId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(action => {
            res.json(action);
        })
        .catch(next);
});

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Router is not working!"
    });
});

module.exports = router;
