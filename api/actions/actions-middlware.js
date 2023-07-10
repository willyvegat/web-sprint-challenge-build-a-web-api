const Action = require('./actions-model');

async function checkActionsId(req, res, next) {
    // const { id } = req.params;
    try {
        const action = await Action.get(req.params.id);
        if (!action) {
            next({ status: 404, message: `No action with the given id ${req.params.id}`})
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        next(err);
    }
}



module.exports = {
    checkActionsId,
}