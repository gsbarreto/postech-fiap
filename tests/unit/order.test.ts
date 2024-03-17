import { test, expect, should } from "vitest";
import Checkout from "../../src/core/usecase/order/checkout";
import InMemoryOrderrepository from "../../src/infra/database/Memory/InMemoryOrderRepository";
import InMemoryCustomerRepository from "../../src/infra/database/Memory/InMemoryCustomerRepository";
import InMemoryProductRepository from "../../src/infra/database/Memory/InMemoryProductRepository";
import Customer from "../../src/core/entity/customer";
import Product from "../../src/core/entity/product";
import Category from "../../src/core/entity/category";
import Order from "../../src/core/entity/order";
import GetOrders from "../../src/core/usecase/order/getOrders";
import CPF from "../../src/core/entity/value-objects/cpf";
import ChangeStatus from "../../src/core/usecase/order/changeStatus";
import ListOrders from "../../src/core/usecase/order/listOrders";
import GetPaymentStatus from "../../src/core/usecase/order/getPaymentStatus";
import { PaymentStatus } from "../../src/core/entity/payment";
import MercadoPago from "../../src/infra/payment/mercadoPago";

test("should do a checkout", async () => {
  const orderRepository = new InMemoryOrderrepository();
  const customerRepository = new InMemoryCustomerRepository();
  const productRepository = new InMemoryProductRepository();
  const paymentRepository = new MercadoPago();
  const customer = new Customer(
    "abc-123",
    "João Barbosa",
    new CPF("023.914.260-89")
  );
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
    productRepository,
    paymentRepository
  );
  const order = await checkout.execute({
    products: [
      { id: product1.id || "", quantity: 2 },
      { id: product2.id || "", quantity: 1 },
    ],
  });
  expect(order.id).not.toBe(null);
  expect(order.status).toBe("received");
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

  const order1 = new Order(
    "1",
    new Customer("1", "Name 1", new CPF("023.914.260-89")),
    [
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
    ]
  );
  orderRepository.save(order1);

  const order2 = new Order(
    "2",
    new Customer("2", "Name 2", new CPF("023.914.260-89")),
    [
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
    ]
  );
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

test("should change order status", async () => {
  const orderRepository = new InMemoryOrderrepository();
  const customerRepository = new InMemoryCustomerRepository();
  const productRepository = new InMemoryProductRepository();

  const order = new Order(
    "1",
    new Customer("1", "Joaquim Pereira", new CPF("023.914.260-89")),
    [
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
    ]
  );
  orderRepository.save(order);

  const changeStatus = new ChangeStatus(orderRepository);

  const orderProcessed = await changeStatus.execute(order.id ?? "", "READY");

  expect(orderProcessed.status).toBe("ready");
});

test("should return all orders sorted by status and createdAt", async () => {
  const orderRepository = new InMemoryOrderrepository();

  const order1 = new Order(
    "1",
    new Customer("1", "Name 1", new CPF("023.914.260-89")),
    [
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
    ]
  );
  const orderSaved1 = await orderRepository.save(order1);

  const order2 = new Order(
    "2",
    new Customer("2", "Name 2", new CPF("023.914.260-89")),
    [
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
    ]
  );

  const orderSaved2 = await orderRepository.save(order2);

  const order3 = new Order(
    "3",
    new Customer("3", "Name 3", new CPF("023.914.260-89")),
    [
      {
        product: new Product(
          "456",
          "Product 2",
          "Desc 1",
          2,
          [],
          Category.ACOMPANHAMENTO
        ),
        quantity: 2,
      },
    ]
  );
  const orderSaved3 = await orderRepository.save(order3);

  const changeStatus = new ChangeStatus(orderRepository);
  changeStatus.execute(orderSaved3.id ?? "", "FINISHED");

  const order4 = new Order(
    "4",
    new Customer("4", "Name 4", new CPF("023.914.260-89")),
    [
      {
        product: new Product(
          "789",
          "Product 2",
          "Desc 1",
          2,
          [],
          Category.LANCHE
        ),
        quantity: 8,
      },
    ]
  );

  const orderSaved4 = await orderRepository.save(order4);
  changeStatus.execute(orderSaved4.id ?? "", "PREPARATION");

  const order5 = new Order(
    "5",
    new Customer("5", "Name 5", new CPF("023.914.260-89")),
    [
      {
        product: new Product(
          "101",
          "Product 2",
          "Desc 1",
          2,
          [],
          Category.BEBIDA
        ),
        quantity: 1,
      },
    ]
  );
  const orderSaved5 = await orderRepository.save(order5);
  changeStatus.execute(orderSaved5.id ?? "", "READY");

  const listOrders = new ListOrders(orderRepository);
  const orders = await listOrders.execute();
  expect(orders.length).toBe(4);
  expect(orders[0].id).toBe(orderSaved5.id);
  expect(orders[1].id).toBe(orderSaved4.id);
  expect(orders[2].id).toBe(orderSaved1.id);
  expect(orders[3].id).toBe(orderSaved2.id);
});

test("should return payment status", async () => {
  const orderRepository = new InMemoryOrderrepository();
  const order = new Order(
    "1",
    new Customer("1", "Name 1", new CPF("023.914.260-89")),
    [
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
    ]
  );

  order.payment?.changeStatus(PaymentStatus["PAID"]);

  const orderSaved = await orderRepository.save(order);

  const getPaymentStatus = new GetPaymentStatus(orderRepository);

  const paymentStatus = await getPaymentStatus.execute(orderSaved.id ?? "");

  expect(paymentStatus).toBe("APPROVED");
});
