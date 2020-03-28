import express, { Application } from "express";
import bodyParser from "body-parser";

// @ts-ignore TODO: hide db string in a different way
import { db } from "./config/config";
import connect from "./connect";
import * as TaskController from "./controllers/task.controller";

const app: Application = express();
const port: number = 5000 || process.env.PORT;

connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/tasks", TaskController.getAllTasks);

app.get("/tasks/:id", TaskController.getTask);

app.post("/tasks", TaskController.addTask);

app.patch("/tasks/:id", TaskController.updateTask);

app.delete("/tasks/:id", TaskController.deleteTask);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
