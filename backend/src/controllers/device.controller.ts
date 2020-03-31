import {Request, Response} from 'express';
import DeviceModel, {DeviceInterface} from '../models/device';

// export const getAllTasks = (req: Request, res: Response) => {
//     TaskModel.find((err: any, tasks: TaskInterface[]) => {
//         if (err) {
//             res.status(500).send(err.message);
//         } else {
//             res.send(tasks);
//         }
//     });
// };

// export const getTask = (req: Request, res: Response) => {
//     TaskModel.findById(req.params.taskId, req.params.deviceId, ((err: any, task: TaskInterface | null) => {
//         if (err) {
//             res.status(500).send(err.message);
//         } else if (!task) {
//             res.status(404).send('Task not found');
//         } else {
//             res.send(task);
//         }
//     }));
// };

export const addTask = (req: Request, res: Response) => {

    // ?????????????????????????????????????????????????????

    const device = DeviceModel.findById(req.params.deviceId);
    // if () {
    //     //dodaj tylko zadanko
    // } else {
    //
    // }

    new DeviceModel(req.body).save((err: any) => {
        if (err) {
            // TODO: status 400 when validation not passed
            res.status(500).send(err.message);
        } else {
            res.send('Device and task added');
        }
    });
};

// export const updateTask = (req: Request, res: Response) => {
//     TaskModel.findByIdAndUpdate(req.params.taskId, req.body, (err: any, task: TaskInterface | null) => {
//         if (err) {
//             // TODO: status 400 when validation not passed
//             res.status(500).send(err.message);
//         } else if(!task) {
//             res.status(404).send('Task not found');
//         } else {
//             res.send('Task updated');
//         }
//     });
// };

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
