import Product from "../../../domain/product";
import IProductRepository from "../../ports/productRepository";

export default class GetProducts {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    const allProducts = await this.productRepository.list();
    return allProducts;
  }
}
