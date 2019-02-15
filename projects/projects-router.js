const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel');

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch {
        res.status(500).json({errorMessage:"Could not retreive projects."})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const response = await Projects.get(id)
        res.status(200).json(response)
    } 
    catch {
        res.status(500).json({errorMessage:"Could not retreive project."})
    }
})

router.get('/:projectId/actions', async (req, res) => {
    const projectId = req.params.projectId
    try {
        const projectActions = await Projects.getProjectActions(projectId);
        res.status(200).json(projectActions)
    } catch {
        res.status(500).json({errorMessage:"Could not retreive project actions."})
    }
})

router.post('/', (req, res) => {
    const project = req.body;
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    } else {
        Projects
        .insert(project)
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json({errorMessage:"Could not post project."}))
    }
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    } else {
        Projects
        .update(id, changes)
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json({errorMessage:"Could not post project."}))
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Projects.remove(id);
        res.status(204).json(deleted)
    } 
    catch {
        res.status(500).json({errorMessage:"Could not delete project."})
    }
})

module.exports = router;