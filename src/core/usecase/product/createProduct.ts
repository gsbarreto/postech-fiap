import Category from "../../entity/category";
import Product from "../../entity/product";
import IProductRepository from "../../repository/productRepository";
import crypto from "crypto";

export default class CreateProduct {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(input: Input): Promise<void> {
    const product = new Product(
      null,
      input.name,
      input.description,
      input.price,
      input.images,
      input.category
    );
    await this.productRepository.save(product);
    return;
  }
}

type Input = {
  name: string;
  category: Category;
  price: number;
  images: string[];
  description: string;
};
