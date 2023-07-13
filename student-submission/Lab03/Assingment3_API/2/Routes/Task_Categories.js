const express = require('express');
const router = express.Router();
const Category = require('../Task_models/Task_Category');

// Creation of a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Category Creation Failed' });
  }
});

// Updation of a category by its id
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Required Category cannot be found'});
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Required Category cannot be updated' });
  }
});

// Get a single category by its id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Required Category cannot be found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Required Category cannot be retrieved' });
  }
});

// Get a list of all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Required Categories cannot be retrieved' });
  }
});


// Deletion of a category by its id
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Required Category cannot be found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Required Category cannot be deleted' });
  }
});

module.exports = router;
