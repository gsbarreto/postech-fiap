import Product from "../../domain/product";

export default interface IProductRepository {
  get(): Promise<Product[]>;
  post(product: Product): void;
}
