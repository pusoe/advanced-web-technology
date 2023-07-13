const express = require('express');
const router = express.Router();
const Task = require('../Task_models/Tasks');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Task creation has failed' });
  }
});

// Update a task by its id
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('category');
    if (!task) {
      return res.status(404).json({ error: 'Required Task cannot be found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Required Task updation has failed' });
  }
});

// Retrieve a single task by its id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('category');
    if (!task) {
      return res.status(404).json({ error: 'Required Task cannot be found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Required Task cannot be retrived' });
  }
});


// Retrieve a list of all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('category');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Required Tasks cannot be retrived' });
  }
});


// Delete a task by its id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id).populate('category');
    if (!task) {
      return res.status(404).json({ error: 'Required Task cannot be found' });
    }
    res.text("Category deleted");
  } catch (err) {
    res.status(500).json({ error: 'Required Task cannot be deleted' });
  }
});

module.exports = router;
