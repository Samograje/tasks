import express, { Application } from "express";
import bodyParser from "body-parser";

// @ts-ignore TODO: hide db string in a different way
import { db } from "./config/config";
import connect from "./connect";
import * as DeviceController from "./controllers/device.controller";

const app: Application = express();
const port: number = 5000 || process.env.PORT;

connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/devices/:deviceId/tasks", DeviceController.getAllTasks);

app.get("/api/devices/:deviceId/tasks/:taskId", DeviceController.getTask);

app.post("/api/devices/:deviceId/tasks", DeviceController.addTask);

app.patch("/api/devices/:deviceId/tasks/:taskId", DeviceController.updateTask);

app.patch("/api/devices/:deviceId/tasks/:taskId/finished", DeviceController.updateTaskInProgress);

app.delete("/api/devices/:deviceId/tasks/:taskId", DeviceController.deleteTask);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
