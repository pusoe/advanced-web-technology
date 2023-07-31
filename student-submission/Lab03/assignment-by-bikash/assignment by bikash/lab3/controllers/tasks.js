const mongoose = require('mongoose')
const  {Task, category}  = require('../models/tasks')


const getAllTasks = async(req,res)=>{
    try {
        const tasks = await Task.find().populate('category')
.then((tasks) => {
        res.status(200).json({tasks})
        })
    } catch (error) {
        res.status(500).json({msg:error})
        
    }
}

const createTask = async (req, res) => {
    try {
      const taskData = req.body;
  
      // Check if an image file was uploaded
      if (req.file) {
        const imagePath = req.file.path;
        taskData.image = imagePath; // Add the image path to the task data
  
        // Set the content type header
        res.set('Content-Type', 'image/jpeg'); 
      }
  
      const task = await Task.create(taskData);
  
      // Send the image file in the response
      res.sendFile(taskData.image);
    } catch (error) {
      res.status(500).json({ error: error.message }); // Send the error message in the response
    }
  };
  
const getTask = async(req, res)=>
{
    try {
        const{id:taskID} = req.params
        const task = await Task.findOne({_id:taskID});
      
        if(!task){
        return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
        
    } catch (error) {
        res.status(500).json({msg:error})
        
    }
}

const deleteTask = async(req,res)=>
{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if (!task)
        {
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})

        
    } catch (error) {
        res.send(500).json({msg:error })
        
    }
    
}
//updatea task
const updateTask = async(req,res)=>
{
   
    try {
        const {id:taskID} = req.params;

        const task = await Task.findOneAndUpdate({_id:taskID},req.body,
            {
                new:true,
                runValidators:true

            })

        if(!task)
        {
            return res.status(404).json({msg:`the task doesnot exist: ${taskID} `})
        }
        res.status(200).json({task})
    } catch (error) {
        res.send(500).json({msg:error })
    }
}


//create new category

const createCategory = async(req,res)=>
{
    try {
        const Category = await category.create(req.body)
        res.status(201).json({Category})
        
    } catch (error) {
        res.status(500).json({msg:error})
        
    }
   
}

//get all categories

const getAllCat = async(req,res)=>{
    try {
        const Category = await category.find({});
        res.status(200).json(Category)
    } catch (error) {
        res.status(500).json({msg:error})
        
    }
}

//get single cat
const getCat = async(req, res)=>
{
    try {
        const{id:CategoryID} = req.params
        const Category = await category.findOne({_id:CategoryID});
      
        if(!Category){
        return res.status(404).json({msg:`No task with id: ${CategoryID}`})
        }
        res.status(200).json({Category})
        
    } catch (error) {
        res.status(500).json({msg:error})
        
    }

}

//update category
const updateCat = async(req,res)=>
{
   
    try {
        const {id:categoryID} = req.params;

        const category = await Task.findOneAndUpdate({_id:categoryID},req.body,
            {
                new:true,
                runValidators:true

            })

        if(!category)
        {
            return res.status(404).json({msg:`the category doesnot exist: ${categoryID} `})
        }
        res.status(200).json({category})
    } catch (error) {
        res.send(500).json({msg:error })
    }
}

const deleteCat = async(req,res)=>
{
    try {
        const {_id:CategoryID} = req.params;
        const category = await Task.findOneAndDelete({CategoryID});
        if (!category)
        {
            return res.status(404).json({msg:`No task with id: ${CategoryID}`})
        }
        res.status(200).json({category})



        
    } catch (error) {
        res.send(500).json({msg:error })
        
    }
    
}






module.exports= {
    getAllTasks,createTask,getTask,updateTask,deleteTask,createCategory,getAllCat,getCat,updateCat,deleteCat
}
