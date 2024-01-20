import IOrderRepository from "../../../core/repository/orderRepository";
import Order from "../../../core/entity/order";
import crypto from "crypto";

export default class InMemoryOrderrepository implements IOrderRepository {
  orders: Order[] = [];
  async save(order: Order): Promise<Order> {
    order.setId(crypto.randomUUID());
    this.orders.push(order);
    return order;
  }
  async list(): Promise<Order[]> {
    return this.orders;
  }

  async findById(id: string): Promise<Order> {
    const order = this.orders.find((order) => order.id === id);
    if (!order) throw new Error("Order not found!");
    return order;
  }

  async update(order: Order): Promise<Order> {
    const index = this.orders.findIndex((o) => o.id === order.id);
    if (index === -1) throw new Error("Order not found!");
    this.orders[index] = order;
    return order;
  }
}
