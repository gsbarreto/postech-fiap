import Order from "../../entity/order";
import IOrderRepository from "../../repository/orderRepository";

export default class ListOrders {
  constructor(readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.list();
    const ordersReady = orders
      .filter((order) => order.status === "ready")
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const ordersPreparation = orders
      .filter((order) => order.status === "preparation")
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const ordersReceived = orders
      .filter((order) => order.status === "received")
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return [...ordersReady, ...ordersPreparation, ...ordersReceived];
  }
}
