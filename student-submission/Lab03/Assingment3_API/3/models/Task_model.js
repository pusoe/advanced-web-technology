const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    attachments: [{
      filename: String,
      path: String,
      size: Number,
      mimeType: String,
    }],
  });
module.exports = mongoose.model('Task', taskSchema);