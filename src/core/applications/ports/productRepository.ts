import Category from "../../domain/category";
import Product from "../../domain/product";

export default interface IProductRepository {
  list(input?: InputList): Promise<Product[]>;
  get(id: string): Promise<Product>;
  save(product: Product): void;
  update(product: Product): void;
  remove(id: string): void;
}

type InputList = {
  category?: Category;
};
