import IOrderRepository from "../../../core/repository/orderRepository";
import Order, { OrderStatus } from "../../../core/entity/order";
import { randomUUID } from "crypto";
import { IOrderModel, OrderModel } from "./schemas/Order";
import { CustomerModel } from "./schemas/Customer";
import { ProductModel } from "./schemas/Product";
import CustomerAdapter from "../../../adapter/CustomerAdapter";
import CategoryAdapter from "../../../adapter/CategoryAdapter";
import ProductAdapter from "../../../adapter/ProductAdapter";
import Payment from "../../../core/entity/payment";

export default class MongoDBOrderrepository implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    order.setId(randomUUID());
    await new OrderModel(order).save();
    return order;
  }
  async list(): Promise<Order[]> {
    const orders = await OrderModel.find({}).exec();
    if (orders.length === 0) return [];
    return await Promise.all(
      orders.map((order) => convertModelToObject(order))
    );
  }

  async findById(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ id });
    if (!order) throw new Error("Order not found");
    return await convertModelToObject(order);
  }

  async update(order: Order): Promise<Order> {
    const orderFound = await OrderModel.findOne({ id: order.id }).exec();
    if (!orderFound) throw new Error("Order not found");
    await OrderModel.updateOne({ id: order.id }, order);
    const updatedOrder = await OrderModel.findOne({ id: order.id }).exec();
    if (!updatedOrder) throw new Error("Failed to update order");
    return await convertModelToObject(updatedOrder);
  }
}

const convertModelToObject = async (order: IOrderModel) => {
  const customerFound = await CustomerModel.findOne({
    id: order.customer.id,
  });
  if (!customerFound) throw new Error("Customer not found");
  const customer = CustomerAdapter.create({
    id: customerFound.id,
    name: customerFound.name,
    cpf: customerFound.cpf,
  });
  const arrayItems = await Promise.all(
    order.items.map(async (item) => {
      const productFound = await ProductModel.findOne({
        id: item.product.id,
      });
      if (!productFound) throw new Error("Product not found");
      return {
        product: ProductAdapter.create({
          id: productFound.id,
          name: productFound.name,
          description: productFound.description,
          price: productFound.price,
          images: productFound.images,
          category: CategoryAdapter.create(productFound.category),
        }),
        quantity: item.quantity,
      };
    })
  );

  const orderMounted = new Order(order.id || "", customer, arrayItems);
  const payment = new Payment();
  payment.changeStatus(order.payment?.status || "REFUSED");
  orderMounted.setPayment(payment);
  orderMounted.setStatus(order.status as OrderStatus);
  return orderMounted;
};
