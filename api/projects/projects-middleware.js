const Projects = require('./projects-model');

async function checkProjectsId(req, res, next) {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        if (project) {
            req.project = project;
            next();
        } else {
            next({ status: 404, message: `No project with the given id ${id}`})
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkProjectsId,

}
