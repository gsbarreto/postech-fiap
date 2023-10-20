import Order from "../../domain/order";

export default interface IOrderRepository {
  save(order: Order): Promise<Order>;
  list(): Promise<Order[]>;
}
