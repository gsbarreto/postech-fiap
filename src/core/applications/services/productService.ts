import ProductRepository from "../ports/productRepository";
import Product from "../../domain/product";

export default class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.get();
  }

  async post(product: Product): Promise<any> {
      this.productRepository.post(product);
  }
}
