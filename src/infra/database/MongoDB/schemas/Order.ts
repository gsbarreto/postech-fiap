import { Schema, model } from "mongoose";
import Customer from "../../../../core/entity/customer";
import Product from "../../../../core/entity/product";
import Payment from "../../../../core/entity/payment";

export interface IOrderModel {
  id: string;
  status: string;
  customer: Customer;
  items: {
    product: Product;
    quantity: number;
  }[];
  payment: Payment;
}

const orderSchema = new Schema<IOrderModel>({
  id: { type: String, unique: true, index: true },
  status: { type: String, required: true },
  customer: { type: Object, required: true },
  items: Array,
  payment: { type: Object },
});

export const OrderModel = model<IOrderModel>("Order", orderSchema);
