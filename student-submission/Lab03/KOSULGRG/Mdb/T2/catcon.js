const express = require('express');
const router = express.Router();
const Category = require('./cattbl');

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Retrieve a list of all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

// Retrieve a single category by its id
router.get('/:cid', async (req, res) => {
  try {
    const category = await Category.findById(req.params.cid);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
});

// Update a category by its id
router.put('/:cid', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.cid,
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete a category by its id
router.delete('/:cid', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.cid);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
