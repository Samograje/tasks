import { Request, Response } from 'express';
import DeviceModel, { DeviceInterface } from '../models/device';
import { TaskInterface } from '../models/task';

/**
 *
 * @param req
 * @param res
 */
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

/**
 *
 * @param req
 * @param res
 */
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

/**
 *
 * @param req
 * @param res
 */
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
                if (err) {
                    // TODO: status 400 when validation not passed
                    res.status(500).send(err.message);
                } else {
                    res.send('Both device and task added');
                }
            });
        } else {
            // adds the task to the existing device
            device.tasks.push(req.body);
            device.save((err: any) => {
                if (err) {
                    // TODO: status 400 when validation not passed
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
                device.tasks[taskIndex] = req.body;
                device.save((err: any) => {
                    if (err) {
                        // TODO: status 400 when validation not passed
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

// export const deleteTask = (req: Request, res: Response) => {
//     TaskModel.findByIdAndDelete(req.params.taskId, (err: any, task: TaskInterface | null) => {
//         if (err) {
//             res.status(500).send(err.message);
//         } else if(!task) {
//             res.status(404).send('Task not found');
//         } else {
//             res.send('Task deleted');
//         }
//     });
// };
