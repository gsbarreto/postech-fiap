import ICustomerRepository from "../../../core/applications/ports/customerRepository";
import Customer from "../../../core/domain/customer";
import crypto from "crypto";

export default class InMemoryCustomerRepository implements ICustomerRepository {
  private readonly customer: Customer[] = [];

  async get({ cpf, id }: { cpf?: string; id?: string }): Promise<Customer> {
    let customer;
    if (cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      customer = this.customer.find((customer) => customer.cpf.get() === cpf);
    }
    if (id) customer = this.customer.find((customer) => customer.id === id);
    if (!customer) throw new Error(`Customer not found!`);
    return customer;
  }

  async save(customer: Customer): Promise<Customer> {
    customer.setId(crypto.randomUUID());
    this.customer.push(customer);
    return customer;
  }
}
