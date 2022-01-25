import { Schema, model, ObjectId } from "mongoose";

export interface Category {
  categoryName: string;
  author: ObjectId,
}

const CategorySchema = new Schema<Category>({
  categoryName: { type: String, required: true },
  //author: { type: Schema.Types.ObjectId, ref: "Author"},
});

export const CategoryModel = model<Category>("Category", CategorySchema);
