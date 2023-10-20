import Order from "../../../domain/order";
import IOrderRepository from "../../ports/orderRepository";

export default class GetOrders {
  constructor(readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.list();
    return orders;
  }
}
