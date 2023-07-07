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

router.put('/:id', checkProjectsId, checkProjectUpdate, (req, res) => {
    Project.update
});

router.delete('/:id', checkProjectsId, (req, res) => {
   
});

router.get('/:id/actions', checkProjectsId, (req, res) => {
   
});

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Router is not working!"
    })
});

module.exports = router;