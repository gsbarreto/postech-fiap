import IOrderRepository from "../../repository/orderRepository";

export default class GetPaymentStatus {
  constructor(readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string): Promise<"APPROVED" | "REFUSED"> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error("Order not found!");
    if (order.payment?.status === "paid") return "APPROVED";
    return "REFUSED";
  }
}
