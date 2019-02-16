const express = require('express');
const server = express();
const projectsRoute = require('./projects/projects-router.js')
const actionsRoute = require('./actions/actions-router.js')

server.use(express.json());
server.use('/api/projects', projectsRoute);
server.use('/api/actions', actionsRoute)


module.exports = server;