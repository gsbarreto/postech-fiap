import Customer from "../core/entity/customer";
import CPF from "../core/entity/value-objects/cpf";

export default class CustomerAdapter {
  static create({ id, name, cpf }: InputCreate): Customer {
    return new Customer(id, name, new CPF(cpf));
  }
}

type InputCreate = {
  id: string;
  name: string;
  cpf: string;
};
