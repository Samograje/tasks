import mongoose, {Schema, Document} from "mongoose";

export interface TaskInterface extends Document {
    title: string;
    contents: string;
    inProgress: boolean;
    priority: string;
    category: string;
    creationDate: Date;
    deadlineDate: Date;
}

export const TaskSchema: Schema = new Schema({
    title: {type: String, required: true},
    details: {type: String, required: false},
    progressStatus: {type: Boolean, required: true},
    priority: {type: String, required: true},
    creationDate: {type: Date, default: Date.now()},
    deadlineDate: {type: Date, required: false},
});

const Task = mongoose.model<TaskInterface>("Task", TaskSchema);
export default Task;
