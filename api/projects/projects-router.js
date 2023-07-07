// Write your "projects" router here!
const express = require('express');
const { checkProjectsId } = require('./projects-middleware');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/:id', checkProjectsId, (req, res) => {
    // console.log(req.project);
    res.json(req.project);
})

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Router is not working!"
    })
})

module.exports = router;