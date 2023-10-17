import ProductRepository from "../ports/productRepository";
import Product from "../../domain/product";

export default class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getProductById(id: Number): Promise<Product> {
    return this.productRepository.get(id);
  }

  async post(product: Product){
      this.productRepository.post(product);
  }

  async put(product: Product){
    this.productRepository.put(product);
  }

  async delete(id: Number) {
    this.productRepository.delete(id);
  }
}
