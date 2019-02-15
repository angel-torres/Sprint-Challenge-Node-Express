const express = require('express')
const router = express.Router();
const Actions = require('../data/helpers/actionModel');

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch {
        res.status(500).json({errorMessage:"Could not retreive actions."})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const response = await Actions.get(id)
        res.status(200).json(response)
    } 
    catch {
        res.status(500).json({errorMessage:"Could not retreive actions."})
    }
})

router.post('/', (req, res) => {
    const action = req.body;
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ errorMessage: "Please provide project id, description, and notes for the action." })
    } else {
        Actions
        .insert(action)
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json({errorMessage:"Could not post action."}))
    }
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ errorMessage: "Please provide project id, description, and notes for the action." })
    } else {
        Actions
        .update(id, changes)
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json({errorMessage:"Could not post action."}))
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Actions.remove(id);
        res.status(204).json(deleted)
    } 
    catch {
        res.status(500).json({errorMessage:"Could not delete action."})
    }
})

module.exports = router;