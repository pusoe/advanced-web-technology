const express = require('express');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./tasks.db');

// Create a database table for tasks
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    status TEXT
  )
`);

// Create a database table for task attachments
db.run(`
  CREATE TABLE IF NOT EXISTS attachments (
    id INTEGER PRIMARY KEY,
    task_id INTEGER,
    filename TEXT,
    filepath TEXT,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
  )
`);

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = Date.now() + extension;
    cb(null, filename);
  }
});

// Initialize multer upload middleware
const upload = multer({ storage });

// API endpoints for File Uploads using API

app.post('/tasks/:id/attachments', upload.single('attachment'), (req, res) => {
  const taskId = req.params.id;
  const { originalname, filename, path } = req.file;

  if (!taskId || !originalname || !filename || !path) {
    return res.status(400).json({ error: 'Invalid input. All fields are required.' });
  }

  // Insert new attachment into the database
  db.run('INSERT INTO attachments (task_id, filename, filepath) VALUES (?, ?, ?)',
    [taskId, originalname, path],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'File uploaded successfully', attachmentId: this.lastID });
    }
  );
});

app.get('/tasks/:id/attachments/:attachmentId', (req, res) => {
  const taskId = req.params.id;
  const attachmentId = req.params.attachmentId;

  if (!taskId || !attachmentId) {
    return res.status(400).json({ error: 'Invalid input. Task ID and Attachment ID are required.' });
  }

  // Retrieve attachment from the database
  db.get('SELECT * FROM attachments WHERE id = ? AND task_id = ?', [attachmentId, taskId], (err, attachment) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }
    const filepath = path.join(__dirname, attachment.filepath);
    res.download(filepath, attachment.filename);
  });
});

// Start the server
app.listen(3002, () => {
  console.log('File Uploads API Server started on port 3002');
});
