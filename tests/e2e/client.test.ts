import axios from "axios";
import { expect, test } from "vitest";

test("should create and get a client", async () => {
  const name = "João Silva";
  const cpf = "12345678910";
  const responseCreate = await axios.post("http://localhost:3000/client", {
    name,
    cpf,
  });
  expect(responseCreate.status).toBe(201);
  const responseGetClient = await axios.get(
    `http://localhost:3000/client/cpf/${cpf}`
  );
  expect(responseGetClient.status).toBe(200);
  expect(responseGetClient.data.name).toBe(name);
  expect(responseGetClient.data.cpf).toBe(cpf);
});
