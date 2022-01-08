import { Schema, model } from "mongoose";

export interface Category {
  name: string;
}

const CategorySchema = new Schema<Category>({
  name: { type: String, required: true },
});

export const CategoryModel = model<Category>("Category", CategorySchema);
