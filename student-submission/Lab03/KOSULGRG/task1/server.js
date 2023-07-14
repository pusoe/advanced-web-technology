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


// Add Task
const newTask = {
  title: 'Sample Task',
  description: 'This is a sample task.',
  status: 'Pending',
};

// Insert the new task into the task_tb1 table
connection.query('INSERT INTO task_tb1 SET ?', newTask, (error, result) => {
  if (error) {
    console.error('Error executing MySQL query:', error);
    return;
  }
  console.log('New task added successfully');
  console.log('Inserted task ID:', result.insertId);
});


// Close the MySQL connection
connection.end((err) => {
  if (err) {
    console.error('Error closing MySQL connection:', err);
    return;
  }
  console.log('MySQL connection closed');
});

