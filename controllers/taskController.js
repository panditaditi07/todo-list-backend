const fs = require("fs");
const path = require("path");
const Task = require("../models/Task");
const AppError = require("../helpers/appErrorClass");
const sendResponse = require("../helpers/sendResponse");
const sendError = require("../helpers/sendError");
const sendErrorMessage = require("../helpers/sendError");
const fileName = path.join(__dirname, "..", "data", "task.json");
const tasks = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const verifyPostRequest = (req, res, next) => {
  const requiredProperties = ["taskName"];
  let result = requiredProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    // res.status(400).json({
    //   status: "Unsuccessful",
    //   message: "request body is not valid",
    // });

    sendErrorMessage(
      new AppError(400, "Unsuccessful", "request body is not valid"),
      req,
      res
    );
  } else {
    next();
  }
};

const patchRequest = (taskIndex, req, res, next) => {
  console.log("patch executec");
  console.log(taskIndex);
  // const updateProperties = ["taskName", "status"];
  // let result = updateProperties.every((key) => {
  //   return req.body[key];
  // });
  // if (!result) {
  //   // res.status(400).json({
  //   //   status: "Unsuccessful",
  //   //   message: "request body is not valid",
  //   // });
  //   sendErrorMessage(
  //     new AppError(400, "Unsuccessful", "request body is not valid"),
  //     req,
  //     res
  //   );
  // } else {
  //   next();
  // }
};

const getAllTasks = (req, res, next) => {
  //   res.status(200).json({
  //     status: "successful",
  //     data: tasks,
  //   });
  sendResponse(200, "Successful", tasks, req, res);
};

const createTask = (req, res, next) => {
  let newTask = new Task(req.body.taskName);
  tasks.push(newTask);
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      //   res.status(500).json({
      //     status: "Internal error",
      //   });
      sendErrorMessage(
        new AppError(500, "Internal Error", "Error in completing task"),
        req,
        res
      );
      return err;
    }

    // res.status(201).json({
    //   status: "Successful",
    //   data: [newTask],
    //   });
    sendResponse(201, "Successful", [newTask], req, res);
  });
};

const getbyId = (req, res, next) => {
  let taskIndex = tasks.findIndex((task) => {
    return task.taskId === req.params.taskId;
  });

  if (taskIndex !== -1) {
    sendResponse(200, "Successful", tasks[taskIndex], req, res);
  } else {
    return sendErrorMessage(
      new AppError(200, "User not found", "Error in finding ID"),
      req,
      res
    );
  }

  next(taskIndex);
};

const updateTask = (taskIndex, req, res, next) => {
  // let taskObject = tasks[taskIndex];
  // //middlewarre for validation
  // //through getbyid we get index
  // //we will get object from array using index after that we will into object by key
  // //we will write the task array into json file
  // taskObject.forEach((key) => {
  //   if (task[key]) {
  //     task[key] = req.body[key];
  //   }
  // });
  // sendResponse(200, "Successfully updated", task, req, res);
  next();
};
module.exports.getAllTasks = getAllTasks;
module.exports.createTask = createTask;
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.getbyId = getbyId;
module.exports.updateTask = updateTask;
module.exports.patchRequest = patchRequest;
