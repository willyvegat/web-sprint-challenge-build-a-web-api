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

function checkAction (req, res, next) {
    const { notes, description } = req.body;
    if (
        !notes || 
        !notes.trim() || 
        !description ||
        !description.trim()
    ) {
        next({ status: 400, message: 'Notes and Description required!'})
    } else {
        req.notes = notes.trim();
        req.description = description.trim();
        next();
    }
}

function checkActionUpdate (req, res, next) {
    const { notes, description, completed } = req.body;
    if (
        !notes && 
        !notes.trim() || 
        !description &&
        !description.trim()
        // || typeof completed !== Boolean
    ) {
        next({ status: 400, message: 'Notes, Description and Completed required!'})
    } else {
        req.notes = notes.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}


module.exports = {
    checkActionsId,
    checkAction,
    checkActionUpdate
}