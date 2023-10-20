import Category from "../../../domain/category";
import Product from "../../../domain/product";
import IProductRepository from "../../ports/productRepository";

export default class GetProductsByCategory {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(category: Category): Promise<Product[]> {
    return this.productRepository.list({
      category,
    });
  }
}
