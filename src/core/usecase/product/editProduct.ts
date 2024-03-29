import Category from "../../entity/category";
import Product from "../../entity/product";
import IProductRepository from "../../repository/productRepository";

export default class EditProduct {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(input: Input): Promise<void> {
    this.productRepository.update(
      new Product(
        input.id,
        input.name,
        input.description,
        input.price,
        input.images,
        input.category
      )
    );
    return;
  }
}

type Input = {
  id: string;
  name: string;
  description: string;
  price: Number;
  images: string[];
  category: Category;
};
