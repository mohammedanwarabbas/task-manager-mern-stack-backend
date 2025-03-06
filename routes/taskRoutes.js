const express = require("express")
const authMiddleware = require("./../middlewares/authMiddleware")
const {createTask, getTasks, getSingleTask, updateTask, deleteTask} = require("../controllers/taskController")

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getSingleTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;