// T1
const express = require('express');
const mongoose = require('mongoose');


const tasks101 = require('./Tcontrol');


// Initialize app
const app = express();
const port = 3000;


// Connect to MongoDB
mongoose.connect('mongodb+srv://kasperkai:thj6udUBqR479zWT@kos11.f811azi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// thj6udUBqR479zWT 


// Handle MongoDB connections
const dcon = mongoose.connection;
dcon.on('error', console.error.bind(console, 'MongoDB connection error:'));
dcon.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(express.json());


app.use('/tasks', tasks101);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
