import Category from "../../entity/category";
import Product from "../../entity/product";
import IProductRepository from "../../repository/productRepository";

export default class GetProductsByCategory {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(category: Category): Promise<Product[]> {
    return this.productRepository.list({
      category,
    });
  }
}
