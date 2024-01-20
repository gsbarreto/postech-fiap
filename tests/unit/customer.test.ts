import { test, expect } from "vitest";
import CreateCustomer from "../../src/core/usecase/customer/createCustomer";
import InMemoryCustomerRepository from "../../src/infra/database/Memory/InMemoryCustomerRepository";
import Customer from "../../src/core/entity/customer";
import GetCustomer from "../../src/core/usecase/customer/getCustomer";
import CPF from "../../src/core/entity/value-objects/cpf";

test("should create a customer", async () => {
  const name = "Joaquim";
  const cpf = "270.630.960-10";
  const customerRepositoryMemory = new InMemoryCustomerRepository();
  const createCustomer = new CreateCustomer(customerRepositoryMemory);
  await createCustomer.execute({
    name,
    cpf,
  });
  const customer = await customerRepositoryMemory.get({ cpf });
  expect(customer.name).toBe(name);
  expect(customer.cpf.get()).toBe(cpf.replace(/[^\d]+/g, ""));
});

test("should get a customer", async () => {
  const name = "Maria";
  const cpf = "888.532.070-86";
  const newCustomer = new Customer(null, name, new CPF(cpf));
  const customerRepositoryMemory = new InMemoryCustomerRepository();
  await customerRepositoryMemory.save(newCustomer);
  const getCustomer = new GetCustomer(customerRepositoryMemory);
  const customer = await getCustomer.execute({ cpf });
  expect(customer.name).toBe(name);
  expect(customer.cpf.get()).toBe(cpf.replace(/[^\d]+/g, ""));
});
