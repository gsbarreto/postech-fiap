import Customer from "./customer";
import Payment from "./payment";
import Product from "./product";

export default class Order {
  id?: string | null | undefined;
  status: OrderStatus;
  createdAt: Date;
  payment?: Payment;

  constructor(
    id: null | string,
    readonly customer: Customer,
    readonly items: ProductAndQuantity[]
  ) {
    this.id = id;
    this.status = OrderStatus.RECEIVED;
    this.createdAt = new Date();
    this.payment = new Payment();
  }

  setId(id: string) {
    this.id = id;
  }

  setStatus(status: OrderStatus) {
    this.status = status;
  }

  setPayment(payment: Payment) {
    this.payment = payment;
  }
}

export type ProductAndQuantity = {
  product: Product;
  quantity: number;
};

export enum OrderStatus {
  RECEIVED = "received",
  PREPARATION = "preparation",
  READY = "ready",
  FINISHED = "finished",
}
