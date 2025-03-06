const Task = require("../models/Task")

const createTask = async(req,res)=>{
    try{
        const {title, description, priority, dueDate, completed} = req.body;
        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            completed,
            assignedTo:req.user.id,
        });
        await task.save();
        res.status(201).json(task)
    }
    catch(err){
        res.status(400).json({"error":err.message})
    }
}

// Get All Tasks for Logged-in User
const getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({assignedTo:req.user.id})
        res.status(200).json(tasks)
    }
    catch(err){
        res.status(400).json({"error":err.message})
    }
}

// Get single task for editing purpose
const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure the logged-in user owns the task
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized, task does not belong to you" });
        }

        res.status(200).json(task); // Send the single task
    } 
    catch (err) {
        res.status(400).json({ error: "Error: " + err.message });
    }
};

//update task
const updateTask = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        if (!task) res.status(404).json({"message":"Task not found"})

        // ensure the user owns the task
        if(task.assignedTo.toString()!== req.user.id) res.status(401).json({"message":"unauthorised, task not belongs to you"})

        // update task
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updateTask)
    }
    catch(err){
        res.status(400).json({"error":"erro : "+err.message})
    }
}

// delete task
const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        if(!task) res.status(404).json({"message":"task not found"})

        // ensure the user owns the task
        if(task.assignedTo.toString()!== req.user.id) res.status(401).json({"message":"unauthorised, task not belongs to you"})

        //delete the task
        await task.deleteOne()
        res.status(200).json({"message":"task deleted successfully"})
    }
    catch(err){
        res.status(500).json({"message":"error : "+err.message})
    }
}

module.exports = {createTask, getTasks, getSingleTask, updateTask, deleteTask}