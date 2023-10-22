import { Request, Response } from "express";
import IProductRepository from "../../../../core/applications/ports/productRepository";
import GetProducts from "../../../../core/applications/use-cases/product/getProducts";
import CreateProduct from "../../../../core/applications/use-cases/product/createProduct";
import EditProduct from "../../../../core/applications/use-cases/product/editProduct";
import RemoveProduct from "../../../../core/applications/use-cases/product/removeProduct";
import Category from "../../../../core/domain/category";
import GetProductsByCategory from "../../../../core/applications/use-cases/product/getProductsByCategory";

export default class ProductController {
  constructor(private readonly productRepository: IProductRepository) {}

  async getProducts(_: Request, response: Response) {
    try {
      const getProducts = new GetProducts(this.productRepository);
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
  }

  async updateProduct(request: Request, response: Response) {
    try {
      const { name, price, category, description, images } = request.body;
      const { id } = request.params;

      const editProduct = new EditProduct(this.productRepository);
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
  }

  async createProduct(request: Request, response: Response) {
    try {
      const { name, price, category, description, images } = request.body;
      const createProduct = new CreateProduct(this.productRepository);
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
  }

  async deleteProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const removeProduct = new RemoveProduct(this.productRepository);
      await removeProduct.execute(id);
      response.status(200).end();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }

  async getProductByCategory(request: Request, response: Response) {
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
          this.productRepository
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
}
