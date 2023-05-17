const express = require('express')
const router = express.Router()

const db = require('../database')

// Read All
router.get('/all', async (req, res) => {
    let data = await db.findAll()
    return res.json(data)
})

// Create
router.post('/create', async (req, res) => {
    try {
        const result = await db.insert(req.body)
        if (result) {
            res.status(201).json(result)
        } else {
            res.status(500).json({ error: 'Failed to insert character' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Read One
router.get('/read/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await db.findOne(id)
        if (!result) {
            return res.status(404).json({ error: 'Item not found' })
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Update
router.put('/update/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await db.update(id, req.body)
        if (!result.value) {
            return res.status(404).json({ error: 'Item not found' })
        }
        res.status(200).json(result.value)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Delete
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await db.deleteOne(id)
        if (!result.value) {
            return res.status(404).json({ error: 'Item not found' })
        }
        res.status(200).json({ message: 'Item deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
