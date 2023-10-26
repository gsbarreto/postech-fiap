import IOrderRepository from "../../../core/applications/ports/orderRepository";
import Order, { OrderStatus } from "../../../core/domain/order";
import { randomUUID } from "crypto";
import { OrderModel } from "./schemas/Order";
import { CustomerModel } from "./schemas/Customer";
import Customer from "../../../core/domain/customer";
import { ProductModel } from "./schemas/Product";
import Product from "../../../core/domain/product";
import Category from "../../../core/domain/category";
import CPF from "../../../core/domain/value-objects/cpf";

export default class MongoDBOrderrepository implements IOrderRepository {
  orders: Order[] = [];
  async save(order: Order): Promise<Order> {
    order.setId(randomUUID());
    await new OrderModel(order).save();
    return order;
  }
  async list(): Promise<Order[]> {
    const orders = await OrderModel.find({}).exec();
    if (orders.length === 0) return [];
    return await Promise.all(
      orders.map(async (order) => {
        const customerFound = await CustomerModel.findOne({
          id: order.customer.id,
        });
        if (!customerFound) throw new Error("Customer not found");
        const customer = new Customer(
          customerFound.id,
          customerFound.name,
          new CPF(customerFound.cpf)
        );
        const arrayItems = await Promise.all(
          order.items.map(async (item) => {
            const productFound = await ProductModel.findOne({
              id: item.product.id,
            });
            if (!productFound) throw new Error("Product not found");
            return {
              product: new Product(
                productFound.id,
                productFound.name,
                productFound.description,
                productFound.price,
                productFound.images,
                productFound.category as Category
              ),
              quantity: item.quantity,
            };
          })
        );

        const orderMounted = new Order(order.id, customer, arrayItems);
        orderMounted.setStatus(order.status as OrderStatus);
        return orderMounted;
      })
    );
  }
}
