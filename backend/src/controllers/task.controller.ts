import { Request, Response } from "express";
import TaskModel from "../models/task";

export const allTasks = (req: Request, res: Response) => {
    TaskModel.find((err: any, tasks: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(tasks);
        }
    });
};

export const showTask = (req: Request, res: Response) => {
    TaskModel.findById(req.params.id, (err: any, task: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(task);
        }
    });
};

export const addTask = (req: Request, res: Response) => {
    const task = new TaskModel(req.body);
    task.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(task);
        }
    });
};

export const updateTask = (req: Request, res: Response) => {
    TaskModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, task: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send(task);
            }
        }
    );
};

export const deleteTask = (req: Request, res: Response) => {
    TaskModel.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("task deleted from database");
        }
    });
};
