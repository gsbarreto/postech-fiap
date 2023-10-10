import ClientRepository from "../ports/clientRepository";
import Client from "../../domain/client";

export default class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async getClientByCPF(cpf: string): Promise<Client> {
    return this.clientRepository.get(cpf);
  }
}
