import TaskModel from "../model/taskModel.js";
import express from "express";
const router=express.Router()

console.log()

router.post('/tasks', async(req, res) => {
    try {
        const { title, description } = req.body;
        const task = new TaskModel({ title, description });
           const newTask=await task.save()
            res.status(201).json(newTask);
            res.status('Completed')
            console.log(`Data Inserted Successfully and data are: ${task}`)
          }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

  
// Retrieve a list of all tasks
router.get('/tasks', async(req, res) => {
     await TaskModel.find()
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });


  // Retrieve a single task by its id
router.get('/tasks/:id', async(req, res) => {
    const taskId = req.params.id;
  
      await TaskModel.findById(taskId)
      .then((task) => {
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
  

  //find by id and update
  router.put('/tasks/:id', async(req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
  
     await TaskModel.findByIdAndUpdate(taskId, { title, description, status }, { new: true })
      .then((updatedTask) => {
        if (!updatedTask) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  
// Delete a task by its id
router.delete('/tasks/:id', async(req, res) => {
    const taskId = req.params.id;
  
     await TaskModel.findByIdAndDelete(taskId)
      .then((removedTask) => {
        if (!removedTask) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });


  export default router;