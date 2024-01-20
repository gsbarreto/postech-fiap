import Category from "../core/entity/category";
import Product from "../core/entity/product";

export default class ProductAdapter {
  static create({
    id,
    name,
    description,
    price,
    images,
    category,
  }: InputCreate): Product {
    return new Product(id, name, description, price, images, category);
  }
}

type InputCreate = {
  id: string;
  name: string;
  description: string;
  price: Number;
  images: string[];
  category: Category;
};
