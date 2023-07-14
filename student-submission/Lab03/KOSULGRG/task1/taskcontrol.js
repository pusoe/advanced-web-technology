const express = require('express');
const mysql = require('mysql2');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task_db',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


const app = express();

// Parse JSON bodies
app.use(express.json());


// Add a new task
app.post('/', (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    res.status(400).json({ error: 'Title, description, and status are required' });
    return;
  }

  const newTask = {
    title,
    description,
    status,
  };

  connection.query('INSERT INTO task_tb1 SET ?', newTask, (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ message: 'Task added successfully', newTask });
  });
});


// Fetch all tasks
app.get('/', (req, res) => {
  connection.query('SELECT * FROM task_tb1', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ tasks: results });
  });
});

// Fetch a task by ID
app.get('/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  connection.query('SELECT * FROM task_tb1 WHERE id = ?', taskId, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ task: results[0] });
  });
});

// Update a task
app.put('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    res.status(400).json({ error: 'Title, description, and status are required' });
    return;
  }

  const updatedTask = {
    title,
    description,
    status,
  };

  connection.query('UPDATE task_tb1 SET ? WHERE id = ?', [updatedTask, taskId], (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ message: 'Task updated successfully' });
  });
});


// Delete a task
app.delete('/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  connection.query('DELETE FROM task_tb1 WHERE id = ?', taskId, (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

