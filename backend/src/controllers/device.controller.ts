import { Request, Response } from 'express';
import DeviceModel, { DeviceInterface } from '../models/device';
import { TaskInterface } from '../models/task';
import { getValidationErrorMessage } from '../config/validation';

export const getAllTasks = (req: Request, res: Response) => {
    const conditions = {
        deviceId: req.params.deviceId,
    };

    const callback = (err: any, device: DeviceInterface) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!device) {
            res.status(404).send('Device not found');
        } else {
            // get all the task of existing device
            res.send(device.tasks);
        }
    };

    DeviceModel.findOne(conditions, callback);
};

export const getTask = (req: Request, res: Response) => {
    const conditions = {
        deviceId: req.params.deviceId,
    };

    const callback = (err: any, device: DeviceInterface) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!device) {
            res.status(404).send('Device not found');
        } else {
            // get all the task of existing device and filter by given taskId
            const task = device.tasks.find((task: TaskInterface) => task._id == req.params.taskId);

            if (!task) {
                // if given task ID does not exist
                res.status(404).send('Task not found');
            } else {
                res.send(task);
            }
        }
    };

    DeviceModel.findOne(conditions, callback);
};

export const addTask = (req: Request, res: Response) => {
    const conditions = {
        deviceId: req.params.deviceId,
    };

    const callback = (err: any, device: DeviceInterface) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!device) {
            // creates new device with the task given
            const newDeviceData = {
                deviceId: req.params.deviceId,
                tasks: [req.body],
            };

            new DeviceModel(newDeviceData).save((err: any) => {
                if (err && err.name === 'ValidationError') {
                    res.status(400).send(getValidationErrorMessage(err));
                } else if (err) {
                    res.status(500).send(err);
                } else {
                    res.send('Both device and task added');
                }
            });
        } else {
            // adds the task to the existing device
            device.tasks.push(req.body);
            device.save((err: any) => {
                if (err && err.name === 'ValidationError') {
                    res.status(400).send(getValidationErrorMessage(err));
                } else if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.send('Task added to the device');
                }
            });
        }
    };

    DeviceModel.findOne(conditions, callback);
};

export const updateTask = (req: Request, res: Response) => {
    const conditions = {
        deviceId: req.params.deviceId,
    };

    // TODO: task update shouldn't change the id

    const callback = (err: any, device: DeviceInterface) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!device) {
            res.status(404).send('Device not found');
        } else {
            // finds the task in the device's tasks
            const taskIndex = device.tasks.findIndex((task: TaskInterface) => task._id == req.params.taskId);
            if (taskIndex === -1) {
                res.status(404).send('Task not found');
            } else {
                // updates the task and saves changes
                device.tasks[taskIndex] = {
                    ...req.body,
                    _id: device.tasks[taskIndex]._id,
                };
                device.save((err: any) => {
                    if (err && err.name === 'ValidationError') {
                        res.status(400).send(getValidationErrorMessage(err));
                    } else if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.send('Task updated');
                    }
                });
            }
        }
    };

    DeviceModel.findOne(conditions, callback);
};

export const updateTaskInProgress = (req: Request, res: Response) => {
    const conditions = {
        deviceId: req.params.deviceId,
    };

    const callback = (err: any, device: DeviceInterface) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!device) {
            res.status(404).send('Device not found');
        } else {
            // finds the task in the device's tasks
            const taskIndex = device.tasks.findIndex((task: TaskInterface) => task._id == req.params.taskId);
            if (taskIndex === -1) {
                res.status(404).send('Task not found');
            } else if (typeof req.body.inProgress !== "boolean") {
                res.status(400).send('Value of inProgress is not a boolean')
            } else {
                // updates the task's inProgress and saves changes
                device.tasks[taskIndex].inProgress = req.body.inProgress;
                device.save((err: any) => {
                if (err && err.name === 'ValidationError') {
                        res.status(400).send(getValidationErrorMessage(err));
                    } else if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.send('Task updated');
                    }
                });
            }
        }
    };

    DeviceModel.findOne(conditions, callback);
};

export const deleteTask = (req: Request, res: Response) => {
    const conditions = {
        deviceId: req.params.deviceId,
    };

    const callback = (err: any, device: DeviceInterface) => {
        if(err){
            res.status(500).send(err.message);
        } else if(!device){
            res.status(404).send('Device not found');
        } else {
            // finds the task in the device's tasks
            const taskIndex = device.tasks.findIndex((task: TaskInterface) => task._id == req.params.taskId);
            if (taskIndex === -1) {
                res.status(404).send('Task not found');
            } else{
                // delete the task and saves changes
                device.tasks.splice(taskIndex, 1);
                device.save((err: any) => {
                    if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.send('Task deleted');
                    }
                });
            }
        }
    };
    DeviceModel.findOne(conditions, callback);
};
