import Customer from "../../../domain/customer";
import ICustomerRepository from "../../ports/customerRepository";

export default class GetCustomer {
  constructor(readonly customerRepository: ICustomerRepository) {}

  async execute(input: Input): Promise<Customer> {
    const { cpf, id } = input;
    const customer = await this.customerRepository.get({ cpf, id });
    if (!customer) throw new Error("CUSTOMER_NOT_FOUND");
    return customer;
  }
}

type Input = {
  cpf?: string;
  id?: string;
};
