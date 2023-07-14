const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Create a new category
app.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const newCategory = {
    name,
  };

  connection.query('INSERT INTO cat_tb1 SET ?', newCategory, (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    newCategory.id = result.insertId;
    res.status(201).json({ message: 'Category created successfully', newCategory });
  });
});


// Retrieve all categories
app.get('/', (req, res) => {
  connection.query('SELECT * FROM cat_tb1', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ categories: results });
  });
});


// Retrieve a category by its ID
app.get('/:Id', (req, res) => {
  const categoryId = req.params.categoryId;

  connection.query('SELECT * FROM cat_tb1 WHERE id = ?', categoryId, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json({ category: results[0] });
  });
});

// Update a category by its ID
app.put('/:Id', (req, res) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const updatedCategory = {
    name,
  };

  connection.query('UPDATE cat_tb1 SET ? WHERE id = ?', [updatedCategory, categoryId], (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json({ message: 'Category updated successfully' });
  });
});

// Delete a category by its ID
app.delete('/:Id', (req, res) => {
  const categoryId = req.params.categoryId;

  connection.query('DELETE FROM cat_tb1 WHERE id = ?', categoryId, (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json({ message: 'Category deleted successfully' });
  });
});

// Start the server
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
