const express = require("express");
const {
  getAllTasks,
  verifyPostRequest,
  createTask,
  patchRequest,
} = require("../controllers/taskController");
const { getbyId, updateTask } = require("../controllers/taskController");
const router = express.Router();

router.route("/tasks").get(getAllTasks).post(verifyPostRequest, createTask);
router.route("/tasks/:taskId").get(getbyId).patch(patchRequest);
module.exports = router;
