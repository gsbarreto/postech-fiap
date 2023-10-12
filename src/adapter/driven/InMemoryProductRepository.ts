import IProductRepository from "../../core/applications/ports/productRepository";
import Category from "../../core/domain/category";
import Product from "../../core/domain/product";

export default class InMemoryProductRepository implements IProductRepository {
  private readonly products: Product[] = [
    { name: "Hamburguer", description: "Pão e uma deliciosa carne!" , "price" : 7.90, "images": ["wwww","tttt"],"category": Category.LANCHE},
    { name: "CheeseBurguer", description: "O famoso pão, carne e queijo!" , "price" : 9.90, "images": ["aaaa","xxxx"],"category": Category.LANCHE},
    { name: "Sundae", description: "Sorvete com magnífica calda. Receita especial!" , "price" : 4.60, "images": ["ddd","aaa"],"category": Category.SOBREMESA},
  ];

  async get(): Promise<Product[]> {
     return this.products;  
    }

    async post(product: Product) {
        try {
            this.products.push(product);              
        } catch (error) {
            throw new Error("Erro ao inserir produto: "+error);
        }
    }
}
