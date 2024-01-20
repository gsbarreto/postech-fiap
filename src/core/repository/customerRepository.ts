import Customer from "../entity/customer";
export default interface ICustomerRepository {
  get(input: InputGet): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
}

type InputGet = {
  cpf?: string;
  id?: string;
};
