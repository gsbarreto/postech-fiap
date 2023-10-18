import { Request, Response } from "express";
import Product from "../../core/domain/product";
import ProductService from "../../core/applications/services/productService";

export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getAll(req: Request, res: Response) {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  }

  async getProductById(req: Request, res: Response) {
   try{
    const { id } = req.params;
    const product = await this.productService.getProductById(parseInt(id));
    res.status(200).json(product);
   }catch(error){
     res.status(404).json(error);
   }
  }

  async postProduct(req: Request, res: Response) {
   try {
     const product: Product = req.body;
     await this.productService.post(product);
    
     res.status(200).json("INSERIDO");
   
    } catch (error) {
     res.status(500).json(error);
   }
  }

  async putProduct(req: Request, res: Response) {
    try {
      const product: Product = req.body;
      await this.productService.put(product);
      res.status(200).json("PRODUTO ATUALIZADO!");
     
    } catch (error) {
      res.status(500).json(error);
    }
   }

   async deleteProduct(req: Request, res: Response) {
    try {
      const { id }= req.params;
      await this.productService.delete(parseInt(id));
     
      res.status(200).json("PRODUTO DELETADO!");
     
    } catch (error) {
      res.status(500).json(error);
    }
   }

  
}
