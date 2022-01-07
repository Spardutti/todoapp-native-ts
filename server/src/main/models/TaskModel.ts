import { Schema, model } from "mongoose";

type Task = {
  taskName: string;
  taskDescription: string;
  isCompleted: boolean;
  dueDate: Date;
};

const TaskSchema = new Schema<Task>({
  taskName: String,
  taskDescription: String,
  isCompleted: { type: Boolean, default: false },
  dueDate: { type: Date, default: new Date(Date.now()) },
});

export const TaskModel = model<Task>("Task", TaskSchema);
