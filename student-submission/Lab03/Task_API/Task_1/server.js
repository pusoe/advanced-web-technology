require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
    const db = mongoose.connection
    db.on('error' , (error) => console.error(error))
        db.once('open', () => console.log('Database connection has been established'));

app.listen(3333, () =>{
    console.log("Server has been started");
})

app.use(express.json())

const Tasks_Router = require('./Route/Task_route');
    app.use('/Tasks', Tasks_Router)

