const express = require("express");
const {
  getAllTasks,
  verifyPostRequest,
  createTask,
  getbyId,
  patchRequest,
  updateTask,
} = require("../controllers/taskController");
// const { updateTask } = require("../controllers/taskController");
const router = express.Router();

router.route("/tasks").get(getAllTasks).post(verifyPostRequest, createTask);
router.route("/tasks/:taskId").get(getbyId).patch(patchRequest, updateTask);
module.exports = router;
