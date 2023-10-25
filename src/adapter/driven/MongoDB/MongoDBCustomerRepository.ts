import { randomUUID } from "crypto";
import ICustomerRepository from "../../../core/applications/ports/customerRepository";
import Customer from "../../../core/domain/customer";
import { CustomerModel } from "./schemas/Customer";

export default class MongoDBCustomerRepository implements ICustomerRepository {
  async get({ cpf, id }: { cpf?: string; id?: string }): Promise<Customer> {
    let customer;
    if (cpf) customer = await CustomerModel.findOne({ cpf }).exec();
    if (id)
      customer = await CustomerModel.findOne({
        id,
      }).exec();
    if (!customer) throw new Error(`Customer not found!`);
    return new Customer(customer.id, customer.name, customer.cpf);
  }

  async save(customer: Customer): Promise<Customer> {
    let queryCustomer = await CustomerModel.findOne({
      cpf: customer.cpf,
    }).exec();
    if (queryCustomer) throw new Error("Customer already registered.");
    customer.setId(randomUUID());
    await new CustomerModel({ ...customer }).save();
    return customer;
  }
}
