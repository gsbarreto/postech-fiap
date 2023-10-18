import { test, expect } from "vitest";
import CreateClient from "../../src/core/applications/use-cases/client/createClient";
import InMemoryClientRepository from "../../src/adapter/driven/InMemoryClientRepository";
import Client from "../../src/core/domain/client";
import GetClient from "../../src/core/applications/use-cases/client/getClient";

test("should create a client", async () => {
  const name = "Joaquim";
  const cpf = "12312312312";
  const clientRepositoryMemory = new InMemoryClientRepository();
  const createClient = new CreateClient(clientRepositoryMemory);
  await createClient.execute({
    name,
    cpf,
  });
  const client = await clientRepositoryMemory.get(cpf);
  expect(client.name).toBe(name);
  expect(client.cpf).toBe(cpf);
});

test("should get a client", async () => {
  const name = "Maria";
  const cpf = "32132132132";
  const newClient = new Client(name, cpf);
  const clientRepositoryMemory = new InMemoryClientRepository();
  await clientRepositoryMemory.save(newClient);
  const getClient = new GetClient(clientRepositoryMemory);
  const client = await getClient.execute(cpf);
  expect(client.name).toBe(name);
  expect(client.cpf).toBe(cpf);
});
