const express = require('express');
const path = require('path');
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sunayana:sunayana123@cluster0.jfhh7u5.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error' , (error) => console.error(error))
db.once('open', () => console.log('Database Connection has been established'));

app.use(express.json())

const tasksRouter = require('./Routes/Tasks');

app.use('/Tasks', tasksRouter);

// Serve the "uploads" folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(4000, () =>{
    console.log("Server has been started");
})