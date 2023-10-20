import Client from "../../domain/client";
export default interface IClientRepository {
  get(input: InputGet): Promise<Client>;
  save(client: Client): Promise<Client>;
}

type InputGet = {
  cpf?: string;
  id?: string;
};
