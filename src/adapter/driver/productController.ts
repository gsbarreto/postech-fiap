import { Request, Response } from "express";
import Product from "../../core/domain/product";
import ProductService from "../../core/applications/services/productService";

export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getAll(req: Request, res: Response) {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  }

  async postProduct(req: Request, res: Response) {
   try {
     const product: Product = req.body;
     console.log(product);
     await this.productService.post(product);
    
   } catch (error) {
     res.status(500).json(error);
   }
    res.status(200).json("INSERIDO");
  }
}
