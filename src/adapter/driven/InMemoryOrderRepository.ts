import IOrderRepository from "../../core/applications/ports/orderRepository";
import Order from "../../core/domain/order";
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
}
