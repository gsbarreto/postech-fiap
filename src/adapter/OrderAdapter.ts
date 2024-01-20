import Customer from "../core/entity/customer";
import Order, { ProductAndQuantity } from "../core/entity/order";
import Product from "../core/entity/product";

export default class OrderAdapter {
  static create({ id, customer, products }: InputCreate) {
    return new Order(id, customer, products);
  }
}

type InputCreate = {
  id: string;
  customer: Customer;
  products: ProductAndQuantity[];
};
