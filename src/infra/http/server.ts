import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

//Repositories
// import InMemoryCustomerRepository from "../../driven/InMemory/InMemoryCustomerRepository";
// import InMemoryOrderRepository from "../../driven/InMemory/InMemoryOrderRepository";
// import InMemoryProductRepository from "../../driven/InMemory/InMemoryProductRepository";
import MongoDBCustomerRepository from "../database/MongoDB/MongoDBCustomerRepository";
import MongoDBProductRepository from "../database/MongoDB/MongoDBProductRepository";
import MongoDBOrderrepository from "../database/MongoDB/MongoDBOrderRepository";
//Controllers
import CustomerController from "../../controller/customer.controller";
import OrderController from "../../controller/order.controller";
import ProductController from "../../controller/product.controller";
import MercadoPago from "../payment/mercadoPago";

const server = express();
server.use(express.json());
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
const PORT = process.env.PORT || 3000;

export default async () => {
  const customerRepository = new MongoDBCustomerRepository();
  const productRepository = new MongoDBProductRepository();
  const orderRepository = new MongoDBOrderrepository();
  const paymentRepository = new MercadoPago();

  const customerController = new CustomerController(customerRepository);
  const productController = new ProductController(productRepository);
  const orderController = new OrderController(
    orderRepository,
    customerRepository,
    productRepository,
    paymentRepository
  );

  server.get(
    "/customer/cpf/:cpf",
    customerController.getCustomerByCPF.bind(customerController)
  );

  server.post(
    "/customer",
    customerController.createCustomer.bind(customerController)
  );

  server.get("/product", productController.getProducts.bind(productController));

  server.post(
    "/product",
    productController.createProduct.bind(productController)
  );

  server.put(
    "/product/:id",
    productController.updateProduct.bind(productController)
  );

  server.delete(
    "/product/:id",
    productController.deleteProduct.bind(productController)
  );

  server.get(
    "/product/category/:category",
    productController.getProductByCategory.bind(productController)
  );
  server.post(
    "/order/checkout",
    orderController.checkout.bind(orderController)
  );

  server.get("/order", orderController.getOrders.bind(orderController));

  server.post(
    "/webhook/payment",
    orderController.changePaymentStatus.bind(orderController)
  );

  server.get(
    "/order/payment/status/:id",
    orderController.getOrderPaymentStatus.bind(orderController)
  );

  server.post(
    "/order/status",
    orderController.updateStatus.bind(orderController)
  );

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
