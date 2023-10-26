import Customer from "../../../domain/customer";
import CPF from "../../../domain/value-objects/cpf";
import ICustomerRepository from "../../ports/customerRepository";

export default class CreateCustomer {
  constructor(readonly customerRepository: ICustomerRepository) {}

  async execute(input: Input) {
    await this.customerRepository.save(
      new Customer(null, input.name, new CPF(input.cpf))
    );
  }
}

type Input = {
  name: string;
  cpf: string;
};
