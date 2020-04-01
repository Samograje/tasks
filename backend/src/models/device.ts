import mongoose, {Schema, Document} from "mongoose";
import {TaskSchema, TaskInterface} from "./task";

export interface DeviceInterface extends Document {
    deviceId: string;
    tasks: TaskInterface[];
}

const DeviceSchema: Schema = new Schema({
    deviceId: {type: String, index: true, unique: true},
    tasks: [TaskSchema]
});

const Device = mongoose.model<DeviceInterface>("Device", DeviceSchema);
export default Device;
