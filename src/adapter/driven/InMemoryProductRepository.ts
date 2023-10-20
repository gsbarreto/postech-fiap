import IProductRepository from "../../core/applications/ports/productRepository";
import Category from "../../core/domain/category";
import Product from "../../core/domain/product";
import crypto from "crypto";

export default class InMemoryProductRepository implements IProductRepository {
  private readonly products: Product[] = [];

  async list(input?: { category: Category }): Promise<Product[]> {
    if (input && input.category) {
      return this.products.filter(
        (product) => product.category === input.category
      );
    }
    return this.products;
  }

  async get(id: string): Promise<Product> {
    let product = this.products.find((product) => {
      return product.id === id;
    });
    if (product === undefined) throw new Error("Produto não encontrado!");
    return product;
  }

  async save(product: Product): Promise<Product> {
    try {
      product.setID(crypto.randomUUID());
      this.products.push(product);
      return product;
    } catch (error) {
      throw new Error("Erro ao inserir produto: " + error);
    }
  }

  async update(product: Product) {
    try {
      let index = this.products.findIndex((x) => x.id === product.id);
      this.products[index] = product;
    } catch (error) {
      throw new Error("Erro ao atualizar produto: " + error);
    }
  }

  async remove(id: string) {
    let index = this.products.findIndex((x) => x.id === id);
    if (index !== -1) this.products.splice(index, 1);
    else throw new Error("Produto não encontrado!");
  }
}
