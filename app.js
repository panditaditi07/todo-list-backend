const express = require("express");
const taskRouter = require("./routes/todoRoutes");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// const { getAllTasks, createTask } = require("./controllers/taskController");
const app = express();
app.use(express.urlencoded({ extended: true }));
// app.get("/todoList/tasks", getAllTasks);
app.use(express.json());
// app.post("/todoList/tasks", createTask);
app.use("/todoList", taskRouter);

// app.get("/todoList/tasks/:id", (req, res) => {});
// app.patch("/todoList/tasks/:id", (req, res) => {});
// app.delete("/todoList/tasks/:id", (req, res) => {});
app.listen(
  process.env.PORT,
  console.log(`server started running at port ${process.env.PORT}`)
);
