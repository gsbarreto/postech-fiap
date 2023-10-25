import { test, expect, beforeEach, describe } from "vitest";
import axios from "axios";

test("should do a checkout and list all orders", async () => {
  // Create Client
  const name = "João Silva";
  const cpf = "12345678910";
  await axios.post("http://localhost:3000/customer", {
    name,
    cpf,
  });
  const responseGetClient = await axios.get(
    `http://localhost:3000/customer/cpf/${cpf}`
  );

  await axios.post("http://localhost:3000/product", {
    name: "Batata Frita",
    price: 9,
    description: "200 gramas",
    images: ["http://img.com"],
    category: "ACOMPANHAMENTO",
  });

  let getProducts = await axios.get("http://localhost:3000/product/");
  const productId = getProducts.data[0].id;
  const { id: userId } = responseGetClient.data;
  const responseCheckout = await axios.post(
    "http://localhost:3000/order/checkout/",
    {
      userId,
      products: [
        {
          id: productId,
          quantity: 2,
        },
      ],
    }
  );

  expect(responseCheckout.status).toBe(200);
  expect(responseCheckout.data.customer.id).toBe(userId);
  expect(responseCheckout.data.items[0].product.id).toBe(productId);
  expect(responseCheckout.data.status).toBe("pending");
});
