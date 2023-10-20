import IClientRepository from "../../core/applications/ports/clientRepository";
import Client from "../../core/domain/client";
import crypto from "crypto";

export default class InMemoryClientRepository implements IClientRepository {
  private readonly clients: Client[] = [];

  async get({ cpf, id }: { cpf?: string; id?: string }): Promise<Client> {
    let client;
    if (cpf) client = this.clients.find((client) => client.cpf === cpf);
    if (id) client = this.clients.find((client) => client.id === id);
    if (!client) throw new Error(`Client not found!`);
    return client;
  }

  async save(client: Client): Promise<Client> {
    client.setId(crypto.randomUUID());
    this.clients.push(client);
    return client;
  }
}
