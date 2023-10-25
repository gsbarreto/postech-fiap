import { Schema, model } from "mongoose";

export interface IProductModel {
  id: string;
  name: string;
  description: string;
  price: Number;
  images: string[];
  category: String;
}

const productSchema = new Schema<IProductModel>({
  id: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  images: Array,
  category: { type: String, required: true },
});

export const ProductModel = model<IProductModel>("Product", productSchema);
