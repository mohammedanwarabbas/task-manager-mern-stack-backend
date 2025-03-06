const mongoose = require("mongoose")


//define the schema(blue print)
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: false, trim: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  dueDate: { type: Date, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  completed: { type: Boolean, default: false },
});

//Middleware that triggers before saving a task document
taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

//create a model
const Task = mongoose.model('Task',taskSchema)

module.exports = Task;