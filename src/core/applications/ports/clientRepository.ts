export default interface IClientRepository {
  get(cpf: string): Promise<Client>;
}
