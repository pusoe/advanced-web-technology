const express = require('express')
const router = express.Router()


const {getAllTasks,createTask,getTask,updateTask,deleteTask,getAllCat,createCategory,getCat, deleteCat, updateCat,} = require('../controllers/tasks')

router.route('/category').get(getAllCat).post(createCategory)
router.route('/category/:id').get(getCat).patch(updateCat).delete(deleteCat)

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)






module.exports = router