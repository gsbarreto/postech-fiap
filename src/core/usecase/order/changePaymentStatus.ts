import { PaymentStatus } from "../../entity/payment";
import IOrderRepository from "../../repository/orderRepository";

export default class ChangePaymentStatus {
  constructor(readonly orderRepository: IOrderRepository) {}

  async execute(
    orderId: string,
    statusPayment: "PAID" | "REFUSED"
  ): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error("Order not found!");
    order.payment?.changeStatus(
      PaymentStatus[statusPayment as keyof typeof PaymentStatus]
    );
    const orderUpdated = await this.orderRepository.update(order);
    return;
  }
}
