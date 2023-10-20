import IProductRepository from "../../ports/productRepository";

export default class RemoveProduct {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.remove(id);
    return;
  }
}
