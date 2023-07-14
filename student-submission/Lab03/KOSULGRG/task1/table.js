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

// Create the tasks table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS task_tb1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL
  )
`;

connection.query(createTableQuery, (error) => {
  if (error) {
    console.error('Error creating tasks table:', error);
    return;
  }
  console.log('Tasks table created or already exist');
});

// Close the MySQL connection
connection.end((err) => {
  if (err) {
    console.error('Error closing MySQL connection:', err);
    return;
  }
  console.log('MySQL connection closed');
});
