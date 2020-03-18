import mongoose, { Schema, Document } from "mongoose";

export interface TaskInterface extends Document {
    deviceId: string;
    title: string;
    contents: string;
    status: string;
    priority: string;
    category: string;
    creationDate: Date;
    deadlineDate: Date;
}

const TaskSchema: Schema = new Schema({
    deviceId: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    contents: {type: String, required: true},
    status: {type: String, required: true},
    priority: {type: String, required: true},
    category: {type: String, required: false},
    creationDate: {type: Date, default: Date.now()},
    deadlineDate: {type: Date, required: false},
});

const Task = mongoose.model<TaskInterface>("Task", TaskSchema);
export default Task;