import { test, expect } from "vitest";
import CreateProduct from "../../src/core/usecase/product/createProduct";
import InMemoryProductRepository from "../../src/infra/database/Memory/InMemoryProductRepository";
import Category from "../../src/core/entity/category";
import RemoveProduct from "../../src/core/usecase/product/removeProduct";
import Product from "../../src/core/entity/product";
import EditProduct from "../../src/core/usecase/product/editProduct";
import GetProductsByCategory from "../../src/core/usecase/product/getProductsByCategory";

test("should create a product", async () => {
  const productObject = {
    name: "Hamburguer de Siri",
    category: Category.LANCHE,
    price: 39.4,
    images: ["http://img.com"],
    description: "Hamburguer feito com siri",
  };
  const productRepository = new InMemoryProductRepository();
  const createProduct = new CreateProduct(productRepository);
  await createProduct.execute(productObject);
  const getProducts = await productRepository.list();
  expect(getProducts[0].name).toBe(productObject.name);
  expect(getProducts[0].category).toBe(productObject.category);
  expect(getProducts[0].description).toBe(productObject.description);
  expect(getProducts[0].price).toBe(productObject.price);
});

test("should remove a product", async () => {
  const productRepository = new InMemoryProductRepository();
  await productRepository.save(
    new Product(
      null,
      "Cheese Burguer",
      "Queijo e Pão",
      10.2,
      ["http:img.com"],
      Category.LANCHE
    )
  );
  const productsAdded = await productRepository.list();
  const removeProduct = new RemoveProduct(productRepository);
  const productId = productsAdded[0].id;
  if (productId) {
    await removeProduct.execute(productId);
  }
  const allProducts = await productRepository.list();
  expect(allProducts.length).toBe(0);
});

test("shoud edit product", async () => {
  const productRepository = new InMemoryProductRepository();
  await productRepository.save(
    new Product(
      null,
      "Coca cola",
      "300 ml",
      5.0,
      ["http:img.com"],
      Category.BEBIDA
    )
  );
  const productsAdded = await productRepository.list();
  const editProduct = new EditProduct(productRepository);
  const id = productsAdded[0].id || "";
  const objectToChange = {
    id,
    name: "Guaraná",
    description: "1 L",
    price: 11,
    images: ["http://guarana.com"],
    category: Category.BEBIDA,
  };
  await editProduct.execute(objectToChange);

  const allProducts = await productRepository.list();
  expect(allProducts[0].id).toBe(objectToChange.id);
  expect(allProducts[0].name).toBe(objectToChange.name);
  expect(allProducts[0].description).toBe(objectToChange.description);
  expect(allProducts[0].price).toBe(objectToChange.price);
  expect(allProducts[0].category).toBe(objectToChange.category);
  expect(allProducts.length).toBe(1);
});

test("shoud list products by category", async () => {
  const productRepository = new InMemoryProductRepository();
  await productRepository.save(
    new Product(
      null,
      "Coca cola",
      "300 ml",
      5.0,
      ["http:img.com"],
      Category.BEBIDA
    )
  );
  await productRepository.save(
    new Product(
      null,
      "Guaraná",
      "600 ml",
      8.0,
      ["http:img.com"],
      Category.BEBIDA
    )
  );
  await productRepository.save(
    new Product(
      null,
      "Xis Gaucho",
      "Pão, salada, ovo, milho",
      23.0,
      ["http://xis.com"],
      Category.LANCHE
    )
  );
  const getProductByCategory = new GetProductsByCategory(productRepository);
  const allProductsFiltered = await getProductByCategory.execute(
    Category.BEBIDA
  );

  expect(allProductsFiltered.length).toBe(2);
  expect(allProductsFiltered[0].category).toBe(Category.BEBIDA);
  expect(allProductsFiltered[1].category).toBe(Category.BEBIDA);
});
