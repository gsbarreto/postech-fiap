import Category from "../../../domain/category";
import Product from "../../../domain/product";
import IProductRepository from "../../ports/productRepository";
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
