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
    const { notes, description, project_id } = req.body;
    if (
        !notes || 
        !notes.trim() || 
        !description ||
        !description.trim() ||
        !project_id
    ) {
        next({ status: 400, message: 'Notes, Description and Project_id required!'})
    } else {
        req.notes = notes.trim();
        req.description = description.trim();
        next();
    }
}

function checkActionUpdate (req, res, next) {
    const { notes, description, project_id, completed } = req.body;
    if (
        !notes ||
        !notes.trim() || 
        !description ||
        !description.trim() ||
        !project_id ||
        completed === undefined
    ) {
        next({ status: 400, message: 'Notes, Description, Project_id and Completed required!'})
    } else {
        req.notes = notes.trim();
        req.description = description.trim();
        // req.completed = completed;
        next();
    }
}


module.exports = {
    checkActionsId,
    checkAction,
    checkActionUpdate
}