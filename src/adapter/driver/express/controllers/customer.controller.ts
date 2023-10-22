import { Request, Response } from "express";
import ICustomerRepository from "../../../../core/applications/ports/customerRepository";
import GetCustomer from "../../../../core/applications/use-cases/customer/getCustomer";
import CreateCustomer from "../../../../core/applications/use-cases/customer/createCustomer";

export default class CustomerController {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async getCustomerByCPF(request: Request, response: Response) {
    try {
      const { cpf } = request.params;
      const getCustomer = new GetCustomer(this.customerRepository);
      const customer = await getCustomer.execute({ cpf });
      response.status(200).json(customer);
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }

  async createCustomer(request: Request, response: Response) {
    try {
      const { name, cpf } = request.body;
      const createCustomer = new CreateCustomer(this.customerRepository);
      await createCustomer.execute({
        name,
        cpf,
      });
      response.status(201).end();
    } catch (err: any) {
      response.status(500).send(err.message);
    }
  }
}
