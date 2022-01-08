import { Schema, model } from "mongoose";

export interface Task {
  taskName: string;
  taskDescription: string;
  isCompleted: boolean;
  dueDate: Date;
}

const TaskSchema = new Schema<Task>({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
});

export const TaskModel = model<Task>("Task", TaskSchema);
