import express from "express";
//Repositories
import InMemoryCustomerRepository from "../../driven/InMemory/InMemoryCustomerRepository";
import InMemoryOrderRepository from "../../driven/InMemory/InMemoryOrderRepository";
import InMemoryProductRepository from "../../driven/InMemory/InMemoryProductRepository";
//Controllers
import CustomerController from "./controllers/customer.controller";
import OrderController from "./controllers/order.controller";
import ProductController from "./controllers/product.controller";

const server = express();
server.use(express.json());
const PORT = process.env.PORT || 3000;

export default async () => {
  const customerRepository = new InMemoryCustomerRepository();
  const productRepository = new InMemoryProductRepository();
  const orderRepository = new InMemoryOrderRepository();

  const customerController = new CustomerController(customerRepository);
  const productController = new ProductController(productRepository);
  const orderController = new OrderController(
    orderRepository,
    customerRepository,
    productRepository
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
  server.post("/checkout", orderController.checkout.bind(orderController));
  //TODO - Implementar rota de obter pedidos

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
