const express = require('express')
const router = express.Router()
const Task = require('../Task_models/Task_model')
const multer = require('multer');


//Creation
router.post('/',  async(req, res) =>{
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
    try{
        const newTask = await task.save()
        res.status(201).json(newTask)
    }
    catch (err){
        res.status(400).json({message: err.message})

    }
   
})

//Updation
router.patch('/:id', getTask, async(req, res) =>{
    if(req.body.name != null){
        res.task.name = req.body.name
    }
    if(req.body.description != null){
        res.task.description = req.body.description
    }
    try{
        const updatedDescription = await res.task.save()
        res.json(updatedDescription)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})

//Get
router.get('/:id', getTask,  (req, res) =>{
    res.send(res.task.description)
})

//Get All
router.get('/', async(req, res) =>{
    try{
        const tasks = await Task.find()
        res.send(tasks)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

//Deletion
router.delete('/:id',getTask, async (req, res) =>{
    try {
        await res.task.deleteOne();
        res.json({message: "task Deleted"})
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }
})

// Set up the multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Attachment_Uploads/'); // Set the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename
  },
});

// Set up multer instance
const upload = multer({ storage });

// Upload file attachment to a task
router.post('/:taskId/attachments', upload.single('attachment'), async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const attachment = req.file;
    res.json({message: "Attachment has been uploaded Successfully"});

    if (!attachment) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newAttachment = {
      filename: attachment.filename,
      path: attachment.path,
      size: attachment.size,
      mimeType: attachment.mimetype,
    };

    task.attachments.push(newAttachment);
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload attachment' });
  }
});

async function getTask(req, res, next){
    let task
    try{
        task = await Task.findById(req.params.id)
        if(task == null){
            return res.status(404).json({ message : "Cannot find Task"})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }

    res.task = task
    next()
}
module.exports = router