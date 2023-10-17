//CLIENT
import InMemoryClientRepository from "./adapter/driven/InMemoryClientRepository";
import ClientController from "./adapter/driver/clientController";
import ClientService from "./core/applications/services/clientService";

//PRODUCT
import InMemoryProductRepository from "./adapter/driven/InMemoryProductRepository";
import ProductController from "./adapter/driver/productController";
import ProductService from "./core/applications/services/productService";

import server from "./server";
const PORT = process.env.PORT || 3000;

(async () => {
  const clientRepository = new InMemoryClientRepository();
  const clientService = new ClientService(clientRepository);
  const clientController = new ClientController(clientService) ;
  const productRepository = new InMemoryProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService) ;

  server.get(
    "/clients/:cpf",
    clientController.getClientByCPF.bind(clientController)
  );

  server.get(
    "/products",
    productController.getAll.bind(productController)
  );
   
  //#TODO - INSERIR VALIDAÇÃO
  server.get(
    "/product/:id",
    productController.getProductById.bind(productController)
  );

  //#TODO - INSERIR VALIDAÇÃO 
  server.post(
    "/product",
    productController.postProduct.bind(productController)
  );

   //#TODO - INSERIR VALIDAÇÃO 
   server.put(
    "/product",
    productController.putProduct.bind(productController)
  );

    //#TODO - INSERIR VALIDAÇÃO 
    server.delete("/product/:id",
      productController.deleteProduct.bind(productController)
    );

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
