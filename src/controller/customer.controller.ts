import { Request, Response } from "express";
import ICustomerRepository from "../core/repository/customerRepository";
import GetCustomer from "../core/usecase/customer/getCustomer";
import CreateCustomer from "../core/usecase/customer/createCustomer";
import { randomUUID } from "crypto";

export default class CustomerController {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async getCustomerByCPF(request: Request, response: Response) {
    try {
      const { cpf } = request.params;
      const getCustomer = new GetCustomer(this.customerRepository);
      let customer = await getCustomer.execute({ cpf });
      response.status(200).json({ ...customer, cpf: customer.cpf.get() });
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }

  async createCustomer(request: Request, response: Response) {
    try {
      const { name, cpf } = request.body;
      const createCustomer = new CreateCustomer(this.customerRepository);
      const id = randomUUID();
      await createCustomer.execute({
        id,
        name,
        cpf,
      });
      response.status(201).end();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }
}
