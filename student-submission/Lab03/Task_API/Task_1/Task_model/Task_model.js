const mongoose = require('mongoose');

const Task_Schema = new mongoose.Schema({
    title :{
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    status: {
        type:String,
        required: true
    }
})
module.exports = mongoose.model('Task',Task_Schema);