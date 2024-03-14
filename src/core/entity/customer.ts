import CPF from "./value-objects/cpf";

export default class Customer {
  constructor(readonly id: string, readonly name: string, readonly cpf: CPF) {
  }
}
