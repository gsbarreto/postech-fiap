import { Response, Request } from "express";
import IOrderRepository from "../core/repository/orderRepository";
import IProductRepository from "../core/repository/productRepository";
import ICustomerRepository from "../core/repository/customerRepository";
import Checkout from "../core/usecase/order/checkout";
import GetOrders from "../core/usecase/order/getOrders";
import IPaymentRepository from "../core/repository/paymentRepository";
import ChangePaymentStatus from "../core/usecase/order/changePaymentStatus";
import ChangeStatus from "../core/usecase/order/changeStatus";
import GetPaymentStatus from "../core/usecase/order/getPaymentStatus";

export default class OrderController {
  constructor(
    readonly orderRepository: IOrderRepository,
    readonly customerRepository: ICustomerRepository,
    readonly productRepository: IProductRepository,
    readonly paymentRepository: IPaymentRepository
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
        throw new Error("Invalid product list");
      if (products.length < 1) throw new Error("Empty cart");
      const checkout = new Checkout(
        this.orderRepository,
        this.customerRepository,
        this.productRepository,
        this.paymentRepository
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

  async getOrders(_: Request, response: Response) {
    try {
      const getOrders = new GetOrders(this.orderRepository);
      const orders = await getOrders.execute();
      const responseParsed = orders?.map((order) => {
        return {
          id: order.id,
          status: order.status,
          items: order.items,
          customer: { ...order.customer, cpf: order.customer.cpf.get() },
        };
      });
      response.status(200).send(responseParsed);
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }

  async changePaymentStatus(request: Request, response: Response) {
    try {
      const { id, topic, status } = request.query as {
        id: string;
        topic: string;
        status: "PAID" | "REFUSED";
      };
      if (topic === "payment") {
        const changePaymentStatus = new ChangePaymentStatus(
          this.orderRepository
        );
        await changePaymentStatus.execute(id, status);
      }
      response.status(200).send();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }

  async getOrderPaymentStatus(request: Request, response: Response) {
    try {
      const { id } = request.query as {
        id: string;
      };
      const getPaymentStatus = new GetPaymentStatus(this.orderRepository);
      const status = getPaymentStatus.execute(id);
      response.status(200).json({ status });
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }

  async updateStatus(request: Request, response: Response) {
    try {
      const { id, status } = request.body as { id: string; status: string };
      const changeStatus = new ChangeStatus(this.orderRepository);
      await changeStatus.execute(id, status);
      response.status(200).send();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }
}
