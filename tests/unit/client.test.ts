import { test, expect } from "vitest";
import CreateCustomer from "../../src/core/applications/use-cases/customer/createCustomer";
import InMemoryCustomerRepository from "../../src/adapter/driven/InMemory/InMemoryCustomerRepository";
import Customer from "../../src/core/domain/customer";
import GetCustomer from "../../src/core/applications/use-cases/customer/getCustomer";

test("should create a customer", async () => {
  const name = "Joaquim";
  const cpf = "12312312312";
  const customerRepositoryMemory = new InMemoryCustomerRepository();
  const createCustomer = new CreateCustomer(customerRepositoryMemory);
  await createCustomer.execute({
    name,
    cpf,
  });
  const customer = await customerRepositoryMemory.get({ cpf });
  expect(customer.name).toBe(name);
  expect(customer.cpf).toBe(cpf);
});

test("should get a customer", async () => {
  const name = "Maria";
  const cpf = "32132132132";
  const newCustomer = new Customer(null, name, cpf);
  const customerRepositoryMemory = new InMemoryCustomerRepository();
  await customerRepositoryMemory.save(newCustomer);
  const getCustomer = new GetCustomer(customerRepositoryMemory);
  const customer = await getCustomer.execute({ cpf });
  expect(customer.name).toBe(name);
  expect(customer.cpf).toBe(cpf);
});
