import Order, { OrderStatus } from "../../entity/order";
import IOrderRepository from "../../repository/orderRepository";

export default class ChangeStatus {
  constructor(readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string, input: string): Promise<Order> {
    const statusToChange = OrderStatus[input as keyof typeof OrderStatus];
    if (!statusToChange) throw new Error("Invalid status!");
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error("Order not found!");
    order.setStatus(statusToChange);
    const orderUpdated = await this.orderRepository.update(order);
    return orderUpdated;
  }
}
