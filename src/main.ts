//CLIENT
import InMemoryClientRepository from "./adapter/driven/InMemoryClientRepository";
import CreateClient from "./core/applications/use-cases/client/createClient";
import GetClient from "./core/applications/use-cases/client/getClient";

//PRODUCT
import InMemoryProductRepository from "./adapter/driven/InMemoryProductRepository";
import ProductController from "./adapter/driver/productController";
import ProductService from "./core/applications/services/productService";

import server from "./server";
import { Request, Response } from "express";
const PORT = process.env.PORT || 3000;

(async () => {
  const clientRepository = new InMemoryClientRepository();
  // // const clientService = new ClientService(clientRepository);
  // const clientController = new ClientController(clientService);
  // const productRepository = new InMemoryProductRepository();
  // const productService = new ProductService(productRepository);
  // const productController = new ProductController(productService);

  server.get("/client/:cpf", async (request: Request, response: Response) => {
    try {
      const { cpf } = request.params;
      const getClient = new GetClient(clientRepository);
      const client = await getClient.execute(cpf);
      response.status(200).json(client);
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  });

  server.post("/client", async (request: Request, response: Response) => {
    try {
      const { name, cpf } = request.body;
      const createClient = new CreateClient(clientRepository);
      await createClient.execute({
        name,
        cpf,
      });
      response.status(201).end();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  });

  // server.get("/products", productController.getAll.bind(productController));

  // //#TODO - INSERIR VALIDAÇÃO
  // server.get(
  //   "/product/:id",
  //   productController.getProductById.bind(productController)
  // );

  // //#TODO - INSERIR VALIDAÇÃO
  // server.post(
  //   "/product",
  //   productController.postProduct.bind(productController)
  // );

  // //#TODO - INSERIR VALIDAÇÃO
  // server.put("/product", productController.putProduct.bind(productController));

  // //#TODO - INSERIR VALIDAÇÃO
  // server.delete(
  //   "/product/:id",
  //   productController.deleteProduct.bind(productController)
  // );

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
