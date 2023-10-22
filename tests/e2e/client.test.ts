import axios from "axios";
import { expect, test } from "vitest";

test("should create and get a customer", async () => {
  const name = "João Silva";
  const cpf = "12345678910";
  const responseCreate = await axios.post("http://localhost:3000/customer", {
    name,
    cpf,
  });
  expect(responseCreate.status).toBe(201);
  const responseGetCustomer = await axios.get(
    `http://localhost:3000/customer/cpf/${cpf}`
  );
  expect(responseGetCustomer.status).toBe(200);
  expect(responseGetCustomer.data.name).toBe(name);
  expect(responseGetCustomer.data.cpf).toBe(cpf);
});
