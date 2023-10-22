import { Response, Request } from "express";
import IOrderRepository from "../../../../core/applications/ports/orderRepository";
import IProductRepository from "../../../../core/applications/ports/productRepository";
import ICustomerRepository from "../../../../core/applications/ports/customerRepository";
import Checkout from "../../../../core/applications/use-cases/order/checkout";

export default class OrderController {
  constructor(
    readonly orderRepository: IOrderRepository,
    readonly customerRepository: ICustomerRepository,
    readonly productRepository: IProductRepository
  ) {}

  async checkout(request: Request, response: Response) {
    try {
      const {
        userId,
        products,
      }: { userId: string; products: { id: string; quantity: number }[] } =
        request.body;
      if (!userId) throw new Error("Invalid userId");
      if (!products || !Array.isArray(products))
        throw new Error("Invalid userId");
      if (products.length < 1) throw new Error("Empty cart");
      const checkout = new Checkout(
        this.orderRepository,
        this.customerRepository,
        this.productRepository
      );
      const order = await checkout.execute({
        userId,
        products,
      });
      response.status(200).send(order);
    } catch (err: any) {
      console.log("error >>>", err.message);
      response.status(500).send(err.message);
    }
  }
}
