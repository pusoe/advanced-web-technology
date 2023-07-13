const express = require('express');
const mongoose = require('mongoose');
const tasksRouter = require('./Routes/Task');
const categoriesRouter = require('./Routes/Task_Categories');
const app = express();
const port = 3333;

mongoose.connect('mongodb+srv://mamikkhanal:mkpassword@cluster0.kryh8ig.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
  db.on('error' , (error) => console.error(error))
    db.once('open', () => {
      console.log('Database Connection has been established');
});

app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/categories', categoriesRouter);
app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
