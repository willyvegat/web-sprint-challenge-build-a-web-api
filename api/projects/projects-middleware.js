const Projects = require('./projects-model');

async function checkProjectsId(req, res, next) {
    // const { id } = req.params;
    try {
        const project = await Projects.get(req.params.id);
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

// function checkProject (req, res, next) {

// }

module.exports = {
    checkProjectsId,

}
