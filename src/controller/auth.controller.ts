
import { Request, Response } from 'express';
import AuthenticateCusotmer from '../core/usecase/customer/authenticateCustomer';
import CreateCustomerCognito from '../core/usecase/customer/createCustomerCognito';
import ICustomerRepository from '../core/repository/customerRepository';

export default class AuthController {
    authenticateCustomer: AuthenticateCusotmer;
    createCustomerCognito: CreateCustomerCognito;
    constructor(private readonly customerRepository: ICustomerRepository){
        this.authenticateCustomer = new AuthenticateCusotmer(customerRepository);
        this.createCustomerCognito = new CreateCustomerCognito(customerRepository);
    }

    async register(request: Request, response: Response) {
        const {nome, cpf, email } = request.body;
        try {
            const retorno = await this.createCustomerCognito.execute(nome, cpf, email);
            if (retorno != null){
                response.status(200).json(retorno);    
            }else{
                response.status(404).json({ error: "Cliente não cadastrado"});    
            }
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            response.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }

    async authenticate(request: Request, response: Response) {
        const { cpf } = request.params as {
            cpf: string;
        };

        try {
            const retorno =  await this.authenticateCustomer.execute(cpf);
            if (retorno != null){
                response.status(200).json(retorno);    
            }else{
                response.status(404).json({ error: "Cliente não validado"});    
            }
        } catch (error) {
            console.error('Erro ao autenticar o usuário:', error);
            response.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }
}
