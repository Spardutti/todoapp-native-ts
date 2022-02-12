import { Schema, model, ObjectId } from "mongoose";

export interface Todo {
  author: ObjectId;
  todoName: string;
  todoDescription: string;
  isCompleted: boolean;
  dueDate: Date;
  category: ObjectId;
  creationDate: Date;
}

const TodoSchema = new Schema<Todo>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  todoName: { type: String, required: true },
  todoDescription: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  creationDate: { type: Date, default: new Date(Date.now()) },
});

export const TodoModel = model<Todo>("Todo", TodoSchema);
