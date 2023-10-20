import Order from "../../../domain/order";
import IClientRepository from "../../ports/clientRepository";
import IOrderRepository from "../../ports/orderRepository";
import IProductRepository from "../../ports/productRepository";

export default class Checkout {
  constructor(
    readonly orderRepository: IOrderRepository,
    readonly clientRepository: IClientRepository,
    readonly productRepository: IProductRepository
  ) {}

  async execute(input: Input): Promise<Order> {
    const { userId, products } = input;

    if (!userId) throw new Error("Invalid user id!");
    const client = await this.clientRepository.get({ id: userId });
    if (!client) throw new Error("Client not found!");

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
    const order = new Order(null, client, itemsAndQuantities);
    const orderProcessed = await this.orderRepository.save(order);
    return orderProcessed;
  }
}

type Input = {
  userId: string;
  products: {
    id: string;
    quantity: number;
  }[];
};
