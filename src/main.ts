//CLIENT
import InMemoryClientRepository from "./adapter/driven/InMemoryClientRepository";
import CreateClient from "./core/applications/use-cases/client/createClient";
import GetClient from "./core/applications/use-cases/client/getClient";

//PRODUCT
import InMemoryProductRepository from "./adapter/driven/InMemoryProductRepository";
import CreateProduct from "./core/applications/use-cases/product/createProduct";
import EditProduct from "./core/applications/use-cases/product/editProduct";
import RemoveProduct from "./core/applications/use-cases/product/removeProduct";

import server from "./server";
import { Request, Response } from "express";
import GetProducts from "./core/applications/use-cases/product/getProducts";
import GetProductsByCategory from "./core/applications/use-cases/product/getProductsByCategory";
import Category from "./core/domain/category";
const PORT = process.env.PORT || 3000;

(async () => {
  const clientRepository = new InMemoryClientRepository();
  const productRepository = new InMemoryProductRepository();

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

  //#TODO - INSERIR VALIDAÇÃO
  server.get("/product", async (_, response: Response) => {
    try {
      const getProducts = new GetProducts(productRepository);
      const products = await getProducts.execute();
      const responseParsed = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          images: product.images,
        };
      });
      response.status(200).send(responseParsed);
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  });

  //#TODO - INSERIR VALIDAÇÃO
  server.post("/product", async (request: Request, response: Response) => {
    try {
      const { name, price, category, description, images } = request.body;
      const createProduct = new CreateProduct(productRepository);
      await createProduct.execute({
        name,
        price,
        category,
        description,
        images,
      });
      response.status(201).end();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  });

  //#TODO - INSERIR VALIDAÇÃO
  server.put("/product/:id", async (request: Request, response: Response) => {
    try {
      const { name, price, category, description, images } = request.body;
      const { id } = request.params;

      const editProduct = new EditProduct(productRepository);
      await editProduct.execute({
        id,
        category,
        name,
        price,
        description,
        images,
      });
      response.status(200).end();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  });

  //#TODO - INSERIR VALIDAÇÃO
  server.delete(
    "/product/:id",
    async (request: Request, response: Response) => {
      try {
        const { id } = request.params;
        const removeProduct = new RemoveProduct(productRepository);
        await removeProduct.execute(id);
        response.status(200).end();
      } catch (err: any) {
        response.status(500).send(err.message);
      }
    }
  );

  //$TODO - INSERIR VALIDAÇÃO
  server.get(
    "/product/category/:category",
    async (request: Request, response: Response) => {
      try {
        const { category } = request.params;
        let categoryObj: Category | undefined;
        switch (category) {
          case "BEBIDA":
            categoryObj = Category.BEBIDA;
            break;
          case "ACOMPANHAMENTO":
            categoryObj = Category.ACOMPANHAMENTO;
            break;
          case "LANCHE":
            categoryObj = Category.LANCHE;
            break;
          case "SOBREMESA":
            categoryObj = Category.SOBREMESA;
            break;
        }
        if (categoryObj !== undefined) {
          const productsByCategory = new GetProductsByCategory(
            productRepository
          );
          const products = await productsByCategory.execute(categoryObj);
          response.status(200).send(products);
        } else {
          throw new Error("Invalid category");
        }
      } catch (err: any) {
        response.status(500).send(err.message);
      }
    }
  );

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
