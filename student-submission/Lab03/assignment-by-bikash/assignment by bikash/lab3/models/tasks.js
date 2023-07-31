const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'must provide a name'],
            trim:true,
            maxlength:[20,'name cannot be more than 20 characters']
        },
        completed:{
            type:Boolean,
            default:false

        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Categories',
        },
          image: {
         type: Buffer 
  }
    }
);

//Create a new schema named Category
const categorySchema = new mongoose.Schema(
    {
    
        name:{
            type:String,
            required:[true,'must provide a name'],
            trim:true,
            maxlength:[20,'category cannot be more than 20 characters']
    },
}
);



const Task = mongoose.model('tasks',TaskSchema);
const category = mongoose.model('Categories',TaskSchema);

/* module.exports = mongoose.model('categories',categorySchema); */

module.exports =
{
    Task,category
}




