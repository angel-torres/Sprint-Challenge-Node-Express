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

module.exports = router;