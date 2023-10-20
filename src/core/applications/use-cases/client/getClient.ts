import Client from "../../../domain/client";
import IClientRepository from "../../ports/clientRepository";

export default class GetClient {
  constructor(readonly clientRepository: IClientRepository) {}

  async execute(input: Input): Promise<Client> {
    const { cpf, id } = input;
    const client = await this.clientRepository.get({ cpf, id });
    if (!client) throw new Error("CLIENT_NOT_FOUND");
    return client;
  }
}

type Input = {
  cpf?: string;
  id?: string;
};
