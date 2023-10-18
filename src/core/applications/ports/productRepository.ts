import Product from "../../domain/product";

export default interface IProductRepository {
  getAll(): Promise<Product[]>;
  get(id: Number): Promise<Product>;
  post(product: Product): void;
  put(product: Product): void;
  delete(id: Number): void;
}
