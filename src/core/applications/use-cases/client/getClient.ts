import Client from "../../../domain/client";
import IClientRepository from "../../ports/clientRepository";

export default class GetClient {
  constructor(readonly clientRepository: IClientRepository) {}

  async execute(cpf: string): Promise<Client> {
    const client = await this.clientRepository.get(cpf);
    if (!client) throw new Error("CLIENT_NOT_FOUND");
    return client;
  }
}
