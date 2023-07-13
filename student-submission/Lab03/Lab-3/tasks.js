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
  )
`);

app.use(express.json());

// Create a new task
app.post('/tasks', (req, res) => {
  const { id, title, description, status } = req.body;

  // Custom validation: Check if the provided id already exists
  db.get('SELECT id FROM tasks WHERE id = ?', id, (err, task) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (task) {
      return res.status(400).json({ error: 'Task with the same id already exists' });
    }

    // Continue with the remaining validations
    if (!id || !title || !description || !status ) {
      return res.status(400).json({ error: 'Invalid input. All fields(id, title, description, status, categoryId) are required.' });
    }

    db.run('INSERT INTO tasks (id, title, description, status ) VALUES (?, ?, ?, ?)',
      [id, title, description, status],
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
  db.all('SELECT id, UPPER(title) AS title, description, status FROM tasks', (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(tasks);
  });
});


// Retrieve a single task by its id
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.get('SELECT id, UPPER(title) AS title, description, status FROM tasks WHERE id = ?', taskId, (err, task) => {
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

// Start the server
app.listen(3000, () => {
  console.log('Tasks API Server started on port 3000');
});
