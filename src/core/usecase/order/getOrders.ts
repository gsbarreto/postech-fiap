import Order from "../../entity/order";
import IOrderRepository from "../../repository/orderRepository";

export default class GetOrders {
  constructor(readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.list();
    return orders;
  }
}
