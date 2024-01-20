import Category from "../entity/category";
import Product from "../entity/product";

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
