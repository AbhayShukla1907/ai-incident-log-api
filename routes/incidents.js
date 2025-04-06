const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// GET all incidents
router.get('/', async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

// POST a new incident
router.post('/', async (req, res) => {
  const { title, description, severity } = req.body;

  if (!title || !description || !['Low', 'Medium', 'High'].includes(severity)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const incident = new Incident({ title, description, severity });
  await incident.save();
  res.status(201).json(incident);
});

// GET incident by ID
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Not found' });
    res.json(incident);
  } catch {
    res.status(404).json({ error: 'Invalid ID format or not found' });
  }
});

// DELETE incident by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Incident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Invalid ID format or not found' });
  }
});

module.exports = router;
