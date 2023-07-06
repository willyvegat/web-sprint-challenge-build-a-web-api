const express = require('express');

const projectsRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);
// Build your actions router in /api/actions/actions-router.js


module.exports = server;
