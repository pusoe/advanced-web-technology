const express = require('express')
const router = express.Router()
const Task = require('../Task_model/Task_model')

//Creation of task
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

// Updation of task 
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

//Get a single task
router.get('/:id', getTask,  (req, res) =>{
    res.send(res.task.description)
})

//Get all the tasks
router.get('/', async(req, res) =>{
    try{
        const tasks = await Task.find()
        res.send(tasks)
    }
        catch(err){
            res.status(500).json({message : err.message})
        }
})


// Deletion of task
router.delete('/:id',getTask, async (req, res) =>{
    try {
        await res.task.deleteOne();
        res.json({message: "Task has been deleted"})
    }
        catch(err) {
            res.status(500).json({message : err.message})
        }
})

async function getTask(req, res, next){
    let task
    try{
        task = await Task.findById(req.params.id)
        if(task == null){
            return res.status(404).json({ message : "Task cannot be found"})
        }
    }
        catch(err){
            return res.status(500).json({message : err.message})
        }
        
    res.task = task

    next()
}

module.exports = router ;