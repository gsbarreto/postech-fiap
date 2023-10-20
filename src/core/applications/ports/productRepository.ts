import Category from "../../domain/category";
import Product from "../../domain/product";

export default interface IProductRepository {
  list(input?: InputList): Promise<Product[]>;
  get(id: string): Promise<Product>;
  save(product: Product): Promise<Product>;
  update(product: Product): Promise<void>;
  remove(id: string): Promise<void>;
}

type InputList = {
  category?: Category;
};
