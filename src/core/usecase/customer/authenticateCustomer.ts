import { Response } from "express";
import AwsLambdaService from "../../../services/awsLambdaService";
import ICustomerRepository from "../../repository/customerRepository";



export default class AuthenticateCusotmer {
  lambdaServices: AwsLambdaService
  constructor(readonly customerRepository: ICustomerRepository) {
    this.lambdaServices = new AwsLambdaService(customerRepository);
  }

  async execute(cpf: string) {
     const resultado = await this.lambdaServices.authenticate(cpf);
     if (resultado)
      return resultado 
     else
        return null;
  }
}
