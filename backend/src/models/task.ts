import mongoose, { Schema, Document } from "mongoose";

export interface TaskInterface extends Document {
    title: string;
    contents: string;
    inProgress: boolean;
    priority: string;
    category: string;
    creationDate: Date;
    deadlineDate: Date;
}

const TaskSchema: Schema = new Schema({
    title: {type: String, required: true},
    contents: {type: String, required: true},
    inProgress: {type: Boolean, required: true},
    priority: {type: String, required: true},
    category: {type: String, required: false},
    creationDate: {type: Date, default: Date.now()},
    deadlineDate: {type: Date, required: false},
});

const Task = mongoose.model<TaskInterface>("Task", TaskSchema);
export default Task;
