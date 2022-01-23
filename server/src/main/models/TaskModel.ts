import { Schema, model, ObjectId } from "mongoose";

export interface Task {
  author: ObjectId;
  taskName: string;
  taskDescription: string;
  isCompleted: boolean;
  dueDate: Date;
  category: ObjectId;
  taskFor: ObjectId;
}

const TaskSchema = new Schema<Task>({
  //author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  //taskFor: { type: Schema.Types.ObjectId, ref: "User"},
  //isCompleted: { type: Boolean, default: false },
  //dueDate: { type: Date, required: true },
  //category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

export const TaskModel = model<Task>("Task", TaskSchema);
