import Customer from "../../entity/customer";
import CPF from "../../entity/value-objects/cpf";
import ICustomerRepository from "../../repository/customerRepository";

export default class CreateCustomer {
  constructor(readonly customerRepository: ICustomerRepository) {}

  async execute(input: Input) {
    await this.customerRepository.save(
      new Customer(input.id, input.name, new CPF(input.cpf))
    );
  }
}

type Input = {
  id: string;
  name: string;
  cpf: string;
};
