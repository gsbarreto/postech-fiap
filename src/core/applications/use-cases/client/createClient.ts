import Client from "../../../domain/client";
import IClientRepository from "../../ports/clientRepository";

export default class CreateClient {
  constructor(readonly clientRepository: IClientRepository) {}

  async execute(input: Input) {
    await this.clientRepository.save(new Client(null, input.name, input.cpf));
  }
}

type Input = {
  name: string;
  cpf: string;
};
