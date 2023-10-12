import Client from "../../domain/client";

export default interface IClientRepository {
  get(cpf: string): Promise<Client>;
}
