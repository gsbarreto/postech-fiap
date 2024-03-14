import Order from "../../entity/order";
import ICustomerRepository from "../../repository/customerRepository";
import IOrderRepository from "../../repository/orderRepository";
import IPaymentRepository from "../../repository/paymentRepository";
import IProductRepository from "../../repository/productRepository";
import CacheConfiguration from "../../../configurations/cacheConfigurations";
import { read } from "fs";

export default class Checkout {
  cacheconfiguration : CacheConfiguration;
  constructor(
    readonly orderRepository: IOrderRepository,
    readonly customerRepository: ICustomerRepository,
    readonly productRepository: IProductRepository,
    readonly paymentRepository: IPaymentRepository
    
  ) {
    this.cacheconfiguration = new CacheConfiguration();
  }

  async execute(input: Input): Promise<Order> {
    const { products } = input;

    let userId = await this.cacheconfiguration.obterTokenDoCache();
    userId = userId !== null ? userId : null;
    console.log("Esse é o usuario " + userId);

    if (!userId) throw new Error("Invalid user id!");
    const customer = await this.customerRepository.get({ id: userId.toString() });
    if (!customer) throw new Error("Customer not found!");

    if (products.length === 0) throw new Error("Empty cart!");

    const itemsAndQuantities = await Promise.all(
      products.map(async (productAndQuantity) => {
        const { id, quantity } = productAndQuantity;
        if (quantity < 1)
          throw new Error("Product must have at least one unity!");
        if (!id) throw new Error("Product id is required!");
        const product = await this.productRepository.get(id);
        if (!product) throw new Error("Product not found");
        return {
          product,
          quantity,
        };
      })
    );
    const order = new Order(null, customer, itemsAndQuantities);
    const orderProcessed = await this.orderRepository.save(order);
    const paymentInfo = await this.paymentRepository.generateQRCode(
      orderProcessed
    );
    orderProcessed.payment?.setQRCode(paymentInfo.qr_data);
    return orderProcessed;
  }
}

type Input = {
  //userId: string;
  products: {
    id: string;
    quantity: number;
  }[];
};
