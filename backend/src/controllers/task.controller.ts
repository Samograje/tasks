import { Request, Response } from 'express';
import TaskModel, { TaskInterface } from '../models/task';

export const getAllTasks = (req: Request, res: Response) => {
    TaskModel.find((err: any, tasks: TaskInterface[]) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(tasks);
        }
    });
};

export const getTask = (req: Request, res: Response) => {
    TaskModel.findById(req.params.id, ((err: any, task: TaskInterface | null) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!task) {
            res.status(404).send('Task not found');
        } else {
            res.send(task);
        }
    }));
};

export const addTask = (req: Request, res: Response) => {
    new TaskModel(req.body).save((err: any) => {
        if (err) {
            // TODO: status 400 when validation not passed
            res.status(500).send(err.message);
        } else {
            res.send('Task added');
        }
    });
};

export const updateTask = (req: Request, res: Response) => {
    TaskModel.findByIdAndUpdate(req.params.id, req.body, (err: any, task: TaskInterface | null) => {
        if (err) {
            // TODO: status 400 when validation not passed
            res.status(500).send(err.message);
        } else if(!task) {
            res.status(404).send('Task not found');
        } else {
            res.send('Task updated');
        }
    });
};

export const deleteTask = (req: Request, res: Response) => {
    TaskModel.findByIdAndDelete(req.params.id, (err: any, task: TaskInterface | null) => {
        if (err) {
            res.status(500).send(err.message);
        } else if(!task) {
            res.status(404).send('Task not found');
        } else {
            res.send('Task deleted');
        }
    });
};
