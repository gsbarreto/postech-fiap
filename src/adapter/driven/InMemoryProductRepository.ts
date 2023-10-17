import { idText } from "typescript";
import IProductRepository from "../../core/applications/ports/productRepository";
import Category from "../../core/domain/category";
import Product from "../../core/domain/product";

export default class InMemoryProductRepository implements IProductRepository {
  private readonly products: Product[] = [
    {id:1, name: "Hamburguer", description: "Pão e uma deliciosa carne!" , "price" : 7.90, "images": ["wwww","tttt"],"category": Category.LANCHE},
    {id:2, name: "CheeseBurguer", description: "O famoso pão, carne e queijo!" , "price" : 9.90, "images": ["aaaa","xxxx"],"category": Category.LANCHE},
    {id:3, name: "Sundae", description: "Sorvete com magnífica calda. Receita especial!" , "price" : 4.60, "images": ["ddd","aaa"],"category": Category.SOBREMESA},
  ];

    async getAll(): Promise<Product[]> {
     return this.products;  
    }

    async get(id : Number): Promise<Product> {
        
        let product = this.products.find(product => { return product.id === id });  

        if(product === undefined)
            throw new Error("Produto não encontrado!");

        return product;
    }

    async post(product: Product) {
        try {
            //#TODO - remover estas linhas quando implementar banco
            let nextId = this.products.length + 1;
            product.id = nextId;

            this.products.push(product);              
        } catch (error) {
            throw new Error("Erro ao inserir produto: "+error);
        }
    }

    async put(product: Product) {
        try {
            let index = this.products.findIndex(x => x.id === product.id);
            console.log(this.products);
            console.log(index);
            this.products[index] = product;              
        } catch (error) {
            throw new Error("Erro ao atualizar produto: "+error);
        }
    }


    async delete(id: Number) {
        
        let index = this.products.findIndex(x => x.id === id);
        console.log(this.products);
        console.log(index);
        console.log(index !== -1);
        if(index !== -1)
            this.products.splice(index, 1);
        else
            throw new Error("Produto não encontrado!");
        
    }
}
