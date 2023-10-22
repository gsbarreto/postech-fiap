import Customer from "../../../domain/customer";
import ICustomerRepository from "../../ports/customerRepository";

export default class CreateCustomer {
  constructor(readonly customerRepository: ICustomerRepository) {}

  async execute(input: Input) {
    await this.customerRepository.save(
      new Customer(null, input.name, input.cpf)
    );
  }
}

type Input = {
  name: string;
  cpf: string;
};
