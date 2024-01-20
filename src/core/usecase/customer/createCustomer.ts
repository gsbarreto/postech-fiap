import Customer from "../../entity/customer";
import CPF from "../../entity/value-objects/cpf";
import ICustomerRepository from "../../repository/customerRepository";

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
