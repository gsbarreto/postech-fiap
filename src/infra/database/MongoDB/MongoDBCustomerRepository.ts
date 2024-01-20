import { randomUUID } from "crypto";
import ICustomerRepository from "../../../core/repository/customerRepository";
import Customer from "../../../core/entity/customer";
import { CustomerModel } from "./schemas/Customer";
import CustomerAdapter from "../../../adapter/CustomerAdapter";

export default class MongoDBCustomerRepository implements ICustomerRepository {
  async get({ cpf, id }: { cpf?: string; id?: string }): Promise<Customer> {
    let customer;
    if (cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      customer = await CustomerModel.findOne({ cpf }).exec();
    }
    if (id)
      customer = await CustomerModel.findOne({
        id,
      }).exec();
    if (!customer) throw new Error(`Customer not found!`);
    return CustomerAdapter.create({
      id: customer.id,
      name: customer.name,
      cpf: customer.cpf,
    });
  }

  async save(customer: Customer): Promise<Customer> {
    let queryCustomer = await CustomerModel.findOne({
      cpf: customer.cpf.get(),
    }).exec();
    if (queryCustomer) throw new Error("Customer already registered.");
    customer.setId(randomUUID());
    await new CustomerModel({ ...customer, cpf: customer.cpf.get() }).save();
    return customer;
  }
}
