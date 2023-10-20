import { test, expect, beforeEach } from "vitest";
import axios from "axios";

beforeEach(async () => {
  const getProducts = await axios.get("http://localhost:3000/product/");
  getProducts.data.forEach(async (product: any) => {
    await axios.delete(`http://localhost:3000/product/${product.id}`);
  });
});

test("should create, list, edit and remove product", async () => {
  const createProduct = await axios.post("http://localhost:3000/product", {
    name: "Red Bull",
    price: 11,
    description: "250 ml",
    images: ["http://img.com"],
    category: "BEBIDA",
  });

  expect(createProduct.status).toBe(201);

  let getProducts = await axios.get("http://localhost:3000/product/");
  const dataGetProducts = getProducts.data;
  expect(getProducts.status).toBe(200);
  expect(dataGetProducts.length).toBe(1);

  const editProduct = await axios.put(
    `http://localhost:3000/product/${dataGetProducts[0].id}`,
    {
      name: "Monster",
      price: 8,
      description: "600 ml",
      images: ["http://monster.com"],
      category: "BEBIDA",
    }
  );
  expect(editProduct.status).toBe(200);

  getProducts = await axios.get("http://localhost:3000/product/");
  expect(getProducts.status).toBe(200);
  expect(getProducts.data.length).toBe(1);
  expect(getProducts.data[0].name).toBe("Monster");

  const deleteProduct = await axios.delete(
    `http://localhost:3000/product/${dataGetProducts[0].id}`
  );
  expect(deleteProduct.status).toBe(200);

  getProducts = await axios.get("http://localhost:3000/product/");
  expect(getProducts.status).toBe(200);
  expect(getProducts.data.length).toBe(0);
});

test("should create two products and filter by category", async () => {
  const createProduct1 = await axios.post("http://localhost:3000/product", {
    name: "Red Bull",
    price: 11,
    description: "250 ml",
    images: ["http://img.com"],
    category: "BEBIDA",
  });
  expect(createProduct1.status).toBe(201);

  const createProduct2 = await axios.post("http://localhost:3000/product", {
    name: "Hamburguer Metz",
    price: 25,
    description: "Pão, carne e queijo cheddar",
    images: ["http://img.com"],
    category: "LANCHE",
  });
  expect(createProduct2.status).toBe(201);

  const productsByCategory = await axios.get(
    "http://localhost:3000/product/category/BEBIDA"
  );
  console.log("das", productsByCategory.data);
  expect(productsByCategory.status).toBe(200);
  expect(productsByCategory.data.length).toBe(1);
});
