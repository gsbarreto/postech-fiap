import { Schema, model } from "mongoose";

export interface ICustomerModel {
  id: string;
  name: string;
  cpf: string;
}

const customerSchema = new Schema<ICustomerModel>({
  id: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
});

export const CustomerModel = model<ICustomerModel>("Customer", customerSchema);
