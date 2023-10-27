import CPF from "./value-objects/cpf";

export default class Customer {
  id: string | null | undefined;
  constructor(id: string | null, readonly name: string, readonly cpf: CPF) {
    this.id = id;
  }

  setId(id: string) {
    this.id = id;
  }
}
