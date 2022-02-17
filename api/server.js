const express = require('express');
const server = express();

// Configure your server here
server.use(express.json());
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('./actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require ('./projects/projects-router');

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// Do NOT `server.listen()` inside this file!
server.get('/', (req, res)=> {
    res.send('Hi')
});

module.exports = server;
