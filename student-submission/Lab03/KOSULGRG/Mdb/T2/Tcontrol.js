// Task Control
const express = require('express');
const router = express.Router();
const Task = require('./Tasktbl');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Retrieve a list of all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('category');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// Retrieve a single task by its id
router.get('/:tid', async (req, res) => {
  try {
    const task = await Task.findById(req.params.tid).populate('category');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

// Update a task by its id
router.put('/:tid', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.tid, req.body, {
      new: true,
    }).populate('category');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task by its id
router.delete('/:tid', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.tid).populate('category');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
