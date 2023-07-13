const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./tasks.db');

// Create a database table for tasks
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    status TEXT,
    categoryId INTEGER,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  )
`);

// Create a database table for categories
db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY,
    name TEXT
  )
`);

app.use(express.json());

// Create a new task
app.post('/tasks', (req, res) => {
  const { id, title, description, status, categoryId } = req.body;

  // Custom validation: Check if the provided id already exists
  db.get('SELECT id FROM tasks WHERE id = ?', id, (err, task) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (task) {
      return res.status(400).json({ error: 'Task with the same id already exists' });
    }

    // Continue with the remaining validations
    if (!id || !title || !description || !status || !categoryId) {
      return res.status(400).json({ error: 'Invalid input. All fields are required.' });
    }

    db.run('INSERT INTO tasks (id, title, description, status, categoryId) VALUES (?, ?, ?, ?, ?)',
      [id, title, description, status, categoryId],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Task created successfully', taskId: this.lastID });
      }
    );
  });
});

// Retrieve a list of all tasks
app.get('/tasks', (req, res) => {
  const categoryId = req.query.categoryId;

  let query = 'SELECT tasks.*, categories.name AS categoryName FROM tasks JOIN categories ON tasks.categoryId = categories.id';
  let params = [];

  if (categoryId) {
    query += ' WHERE tasks.categoryId = ?';
    params.push(categoryId);
  }

  db.all(query, params, (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(tasks);
  });
});

// Retrieve a single task by its id
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.get('SELECT tasks.*, categories.name AS categoryName FROM tasks JOIN categories ON tasks.categoryId = categories.id WHERE tasks.id = ?', taskId, (err, task) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  });
});

// Update a task by its id
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { id, title, description, status, categoryId } = req.body;

  // Custom validation: Check if the provided id conflicts with an existing task
  db.get('SELECT id FROM tasks WHERE id = ? AND id != ?', [id, taskId], (err, task) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (task) {
      return res.status(400).json({ error: 'Task with the same id already exists' });
    }

    // Continue with the remaining validations
    if (!id || !title || !description || !status || !categoryId) {
      return res.status(400).json({ error: 'Invalid input. All fields are required.' });
    }

    db.run('UPDATE tasks SET id = ?, title = ?, description = ?, status = ?, categoryId = ? WHERE id = ?',
      [id, title, description, status, categoryId, taskId],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Task updated successfully' });
      }
    );
  });
});

// Delete a task by its id
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.run('DELETE FROM tasks WHERE id = ?', taskId, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// Create a new category
app.post('/categories', (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: 'Invalid input. All fields are required.' });
  }

  db.run('INSERT INTO categories (id, name) VALUES (?, ?)',
    [id, name],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Category created successfully', categoryId: this.lastID });
    }
  );
});

// Retrieve a list of all categories
app.get('/categories', (req, res) => {
  db.all('SELECT * FROM categories', (err, categories) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(categories);
  });
});

// Retrieve a single category by its id
app.get('/categories/:id', (req, res) => {
  const categoryId = req.params.id;

  db.get('SELECT categories.*, tasks.id AS taskId, tasks.title, tasks.description, tasks.status FROM categories LEFT JOIN tasks ON categories.id = tasks.categoryId WHERE categories.id = ?', categoryId, (err, category) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  });
});

// Update a category by its id
app.put('/categories/:id', (req, res) => {
  const categoryId = req.params.id;
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: 'Invalid input. All fields are required.' });
  }

  db.run('UPDATE categories SET id = ?, name = ? WHERE id = ?',
    [id, name, categoryId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'Category updated successfully' });
    }
  );
});

// Delete a category by its id
app.delete('/categories/:id', (req, res) => {
  const categoryId = req.params.id;

  db.run('DELETE FROM categories WHERE id = ?', categoryId, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Category deleted successfully' });
  });
});

// Retrieve a list of all tasks
app.get('/tasks', (req, res) => {
  const categoryId = req.query.categoryId;

  let query = 'SELECT tasks.*, categories.name AS categoryName FROM tasks JOIN categories ON tasks.categoryId = categories.id';
  let params = [];

  if (categoryId) {
    query += ' WHERE tasks.categoryId = ?';
    params.push(categoryId);
  }

  db.all(query, params, (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(tasks);
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Tasks API Server started on port 3001');
});
