import { Schema, model } from "mongoose";
import Customer from "../../../../core/entity/customer";
import Product from "../../../../core/entity/product";

export interface IOrderModel {
  id: string;
  status: string;
  customer: Customer;
  items: {
    product: Product;
    quantity: number;
  }[];
}

const orderSchema = new Schema<IOrderModel>({
  id: { type: String, unique: true, index: true },
  status: { type: String, required: true },
  customer: { type: Object, required: true },
  items: Array,
});

export const OrderModel = model<IOrderModel>("Order", orderSchema);
