import mongoose, {Schema, Document} from "mongoose";
import {TaskSchema, TaskInterface} from "./task";

export interface DeviceInterface extends Document {
    deviceId: number;
    tasks: TaskInterface[];
}

const DeviceSchema: Schema = new Schema({
    deviceId: {type: Number, index: true, unique: true},
    // tasks: [
    //     {
    //         taskId: {type: Number, unique: true},
    //         title: {type: String, required: true},
    //         details: {type: String, required: false},
    //         progressStatus: {type: Boolean, required: true},
    //         priority: {type: String, required: true},
    //         creationDate: {type: Date, default: Date.now()},
    //         deadlineDate: {type: Date, required: false},
    //     }
    // ]
    tasks: [TaskSchema]
});

const Device = mongoose.model<DeviceInterface>("Device", DeviceSchema);
export default Device;
