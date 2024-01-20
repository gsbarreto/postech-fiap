import Order, { OrderStatus } from "../entity/order";

export default interface IOrderRepository {
  save(order: Order): Promise<Order>;
  list(): Promise<Order[]>;
  findById(id: string): Promise<Order>;
  update(order: Order): Promise<Order>;
}
