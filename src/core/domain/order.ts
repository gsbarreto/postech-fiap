import Customer from "./customer";
import Product from "./product";

export default class Order {
  id?: string | null;
  status: OrderStatus;
  constructor(
    id: null | string,
    readonly customer: Customer,
    readonly items: productAndQuantity[]
  ) {
    this.id = id;
    this.status = OrderStatus.PENDING;
  }

  setId(id: string) {
    this.id = id;
  }

  setStatus(status: OrderStatus) {
    this.status = status;
  }
}

type productAndQuantity = {
  product: Product;
  quantity: number;
};

enum OrderStatus {
  PENDING = "pending",
  DELIVERED = "delivered",
}
