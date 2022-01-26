import { Schema, model, ObjectId } from "mongoose";

export interface Category {
  author: ObjectId,
  categoryName: string;
}

const CategorySchema = new Schema<Category>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true},
  categoryName: { type: String, required: true },
});

export const CategoryModel = model<Category>("Category", CategorySchema);
