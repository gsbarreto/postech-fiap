import { response } from "express";
import AwsLambdaService from "../../../services/awsLambdaService";
import ICustomerRepository from "../../repository/customerRepository";



export default class CreateCustomerCognito {
  lambdaServices: AwsLambdaService;
  constructor(readonly customerRepository: ICustomerRepository) {
    this.lambdaServices = new AwsLambdaService(customerRepository);
  }

  async execute(name: string, cpf: string, email: string)  {
     const user = await this.lambdaServices.registerUser(name, cpf, email);
     if (user)
        return user;
    else{
        return null;
    }
  }
}
