import { DateTime } from "luxon";
import { Schema, model, ObjectId } from "mongoose";

export interface Todo {
  author: ObjectId;
  todoName: string;
  todoDescription: string;
  isCompleted: boolean;
  dueDate: Date;
  category: ObjectId;
  updated: DateTime;
  updateType: string;
}

const TodoSchema = new Schema<Todo>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  todoName: { type: String, required: true },
  todoDescription: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  updated: { type: Date },
  updateType: { type: String, default: "Created" },
});

export const TodoModel = model<Todo>("Todo", TodoSchema);
