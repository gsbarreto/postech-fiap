import IProductRepository from "../../../core/repository/productRepository";
import Category from "../../../core/entity/category";
import Product from "../../../core/entity/product";
import { ProductModel } from "./schemas/Product";
import { randomUUID } from "crypto";
import ProductAdapter from "../../../adapter/ProductAdapter";
import CategoryAdapter from "../../../adapter/CategoryAdapter";

export default class MongoDBProductRepository implements IProductRepository {
  async list(input?: { category: Category }): Promise<Product[]> {
    const query: { category?: string } = {};
    if (input && input.category) {
      query.category = input.category;
    }
    const productsFound = await ProductModel.find(query).exec();
    return productsFound.map((product) =>
      ProductAdapter.create({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        category: CategoryAdapter.create(product.category),
      })
    );
  }

  async get(id: string): Promise<Product> {
    const productFound = await ProductModel.findOne({ id }).exec();
    if (!productFound) throw new Error("Produto não encontrado!");
    return ProductAdapter.create({
      id: productFound.id,
      name: productFound.name,
      description: productFound.description,
      price: productFound.price,
      images: productFound.images,
      category: CategoryAdapter.create(productFound.category),
    });
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
