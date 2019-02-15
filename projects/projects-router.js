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

module.exports = router;