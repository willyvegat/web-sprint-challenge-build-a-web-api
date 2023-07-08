const Project = require('./projects-model');

async function checkProjectsId(req, res, next) {
    // const { id } = req.params;
    try {
        const project = await Project.get(req.params.id);
        if (!project) {
            next({ status: 404, message: `No project with the given id ${req.params.id}`})
        } else {
            req.project = project;
            next();
        }
    } catch (err) {
        next(err);
    }
}

function checkProject (req, res, next) {
    const { name, description } = req.body;
    if (
        !name || 
        !name.trim() || 
        !description ||
        !description.trim()
    ) {
        next({ status: 400, message: 'Name and Description required!'})
    } else {
        req.name = name.trim();
        req.description = description.trim();
        next();
    }
}

function checkProjectUpdate (req, res, next) {
    const { name, description, completed } = req.body;
    if (
        !name && 
        !name.trim() || 
        !description &&
        !description.trim()
        // || typeof completed !== Boolean
    ) {
        next({ status: 400, message: 'Name, Description and Completed required!'})
    } else {
        req.name = name.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}

module.exports = {
    checkProjectsId,
    checkProject,
    checkProjectUpdate
}
