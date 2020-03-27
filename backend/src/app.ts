import express, { Application } from "express";
import bodyParser from "body-parser";

import connect from "./connect";
import { db } from "./config/config";
import * as TaskController from "./controllers/task.controller";

const app: Application = express();
const port: number = 5000 || process.env.PORT;

connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/tasks", TaskController.allTasks);

app.get("/tasks/:id", TaskController.showTask);

app.post("/tasks", TaskController.addTask);

app.patch("/tasks/:id", TaskController.updateTask);

app.delete("/tasks/:id", TaskController.deleteTask);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
