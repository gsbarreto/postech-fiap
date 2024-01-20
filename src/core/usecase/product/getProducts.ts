import Product from "../../entity/product";
import IProductRepository from "../../repository/productRepository";

export default class GetProducts {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    const allProducts = await this.productRepository.list();
    return allProducts;
  }
}
