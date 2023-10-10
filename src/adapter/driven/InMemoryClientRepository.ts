import IClientRepository from "../../core/applications/ports/clientRepository";
import Client from "../../core/domain/client";

export default class InMemoryClientRepository implements IClientRepository {
  private readonly clients: Client[] = [
    { name: "John Doe", cpf: "00000000000" },
    { name: "Zé Ninguem", cpf: "11111111111" },
  ];

  async get(cpf: string): Promise<Client> {
    const client = this.clients.find((client) => client.cpf === cpf);
    if (!client) throw new Error(`Client not found!`);
    return client;
  }
}
