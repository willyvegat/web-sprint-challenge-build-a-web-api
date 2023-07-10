const express = require('express');
const { checkProjectsId, checkProject, checkProjectUpdate } = require('./projects-middleware');
const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
});

router.get('/:id', checkProjectsId, (req, res) => {
    res.json(req.project);
});

router.post('/', checkProject, (req, res, next) => {
   Project.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject);
    })
    .catch(next)
});

// router.post('/', checkProject, async (req, res, next) => {
//     try{
//         const newProject = await Project.insert({ 
//             name: req.name, 
//             description: req.description 
//         })
//         res.status(201).json(newProject);
//     } catch (err) {
//         next(err)
//     }    
//  });

router.put('/:id', checkProjectsId, checkProjectUpdate, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(updatedProject => {
            res.json(updatedProject);
        })
        .catch(next);
});
// router.put('/:id', checkProjectsId, checkProjectUpdate, (req, res, next) => {
//     Project.update(req.params.id, { name: req.name, description: req.description })
//         .then(() => {
//             return Project.get(req.params.id)
//         })
//         .then(updatedProject => {
//             res.json(updatedProject);
//         })
//         .catch(next)
// });

router.delete('/:id', checkProjectsId, (req, res, next) => {
   Project.remove(req.params.id)
    .then(project => {
        res.json(project);
    })
    .catch(next);
});

router.get('/:id/actions', checkProjectsId, (req, res, next) => {
   Project.getProjectActions(req.params.id)
    .then(actions => {
        console.log(actions);
        res.json(actions);
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