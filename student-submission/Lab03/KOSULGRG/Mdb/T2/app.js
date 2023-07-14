// T2
const express = require('express');
const mongoose = require('mongoose');

const tasks202 = require('./Tcontrol');
const categories202 = require('./catcon');

// Initialize app
const app = express();
const port = 2001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://kasperkai:thj6udUBqR479zWT@kos11.f811azi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection 
const dbcon = mongoose.connection;
dbcon.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbcon.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use('/tasks', tasks202);
app.use('/categories', categories202);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
