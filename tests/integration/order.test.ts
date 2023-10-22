import { test, expect, should } from "vitest";
import Checkout from "../../src/core/applications/use-cases/order/checkout";
import InMemoryOrderrepository from "../../src/adapter/driven/InMemory/InMemoryOrderRepository";
import InMemoryCustomerRepository from "../../src/adapter/driven/InMemory/InMemoryCustomerRepository";
import InMemoryProductRepository from "../../src/adapter/driven/InMemory/InMemoryProductRepository";
import Customer from "../../src/core/domain/customer";
import Product from "../../src/core/domain/product";
import Category from "../../src/core/domain/category";
import Order from "../../src/core/domain/order";
import GetOrders from "../../src/core/applications/use-cases/order/getOrders";

test("should do a checkout", async () => {
  const orderRepository = new InMemoryOrderrepository();
  const customerRepository = new InMemoryCustomerRepository();
  const productRepository = new InMemoryProductRepository();
  const customer = new Customer(null, "João Barbosa", "000.111.222-33");
  await customerRepository.save(customer);

  const product1 = new Product(
    null,
    "Hamburguer",
    "Pão, alface e carne",
    22,
    ["http://hamburger.com"],
    Category.LANCHE
  );
  await productRepository.save(product1);
  const product2 = new Product(
    null,
    "Fanta",
    "Sabor Laranja - 800 ml",
    8,
    ["http://fanta.com"],
    Category.BEBIDA
  );
  await productRepository.save(product2);

  const checkout = new Checkout(
    orderRepository,
    customerRepository,
    productRepository
  );
  const order = await checkout.execute({
    userId: customer.id || "",
    products: [
      { id: product1.id || "", quantity: 2 },
      { id: product2.id || "", quantity: 1 },
    ],
  });
  expect(order.items.length).toBe(2);
  expect(order.customer.cpf).toBe(customer.cpf);
  const product1Processed = order.items.filter(
    (item) => item.product.id === product1.id
  );
  expect(product1Processed.length).toBe(1);
  expect(product1Processed[0].quantity).toBe(2);
  const product2Processed = order.items.filter(
    (item) => item.product.id === product2.id
  );
  expect(product2Processed.length).toBe(1);
  expect(product2Processed[0].quantity).toBe(1);
});

test("should list orders", async () => {
  const orderRepository = new InMemoryOrderrepository();
  const customerRepository = new InMemoryCustomerRepository();
  const productRepository = new InMemoryProductRepository();

  const order1 = new Order("1", new Customer("1", "Name 1", "000.000.000-01"), [
    {
      product: new Product(
        "123",
        "Product 1",
        "Desc 1",
        1,
        [],
        Category.LANCHE
      ),
      quantity: 1,
    },
  ]);
  orderRepository.save(order1);

  const order2 = new Order("2", new Customer("2", "Name 2", "000.000.000-02"), [
    {
      product: new Product(
        "321",
        "Product 2",
        "Desc 1",
        2,
        [],
        Category.BEBIDA
      ),
      quantity: 3,
    },
  ]);
  orderRepository.save(order2);

  const getOrders = new GetOrders(orderRepository);

  const orders = await getOrders.execute();

  expect(orders.length).toBe(2);
  const customersNames = orders.map((order) => order.customer.name);
  expect(customersNames).toEqual(["Name 1", "Name 2"]);
  const ordersIds = orders.map((order) => order.items[0].product.id);
  expect(ordersIds).toEqual(["123", "321"]);
  const itemsQuantities = orders.map((order) => order.items[0].quantity);
  expect(itemsQuantities).toEqual([1, 3]);
});
