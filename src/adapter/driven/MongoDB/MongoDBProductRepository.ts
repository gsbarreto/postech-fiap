import IProductRepository from "../../../core/applications/ports/productRepository";
import Category from "../../../core/domain/category";
import Product from "../../../core/domain/product";
import { ProductModel, IProductModel } from "./schemas/Product";
import { randomUUID } from "crypto";

export default class MongoDBProductRepository implements IProductRepository {
  private convertModalToProduct(productModel: IProductModel): Product {
    return new Product(
      productModel.id,
      productModel.name,
      productModel.description,
      productModel.price,
      productModel.images,
      productModel.category as Category
    );
  }

  async list(input?: { category: Category }): Promise<Product[]> {
    const query: { category?: string } = {};
    if (input && input.category) {
      query.category = input.category;
    }
    const productsFound = await ProductModel.find(query).exec();
    return productsFound.map((product) => this.convertModalToProduct(product));
  }

  async get(id: string): Promise<Product> {
    const productFound = await ProductModel.findOne({ id }).exec();
    if (!productFound) throw new Error("Produto não encontrado!");
    return this.convertModalToProduct(productFound);
  }

  async save(product: Product): Promise<Product> {
    try {
      product.setID(randomUUID());
      await new ProductModel({ ...product }).save();
      return product;
    } catch (error) {
      throw new Error("Erro ao inserir produto: " + error);
    }
  }

  async update(product: Product) {
    try {
      await ProductModel.findOneAndUpdate({ id: product.id }, product);
    } catch (error) {
      throw new Error("Erro ao atualizar produto: " + error);
    }
  }

  async remove(id: string) {
    await ProductModel.deleteOne({ id });
  }
}
