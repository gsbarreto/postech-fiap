const axios = require("axios");
import "dotenv/config";
import CacheConfiguration from "../configurations/cacheConfigurations";
import ICustomerRepository from "../core/repository/customerRepository";
import CreateCustomer from "../core/usecase/customer/createCustomer";

export default class AwsLambdaService {
    cacheConfiguration: CacheConfiguration;
    customerRepository: ICustomerRepository;


    constructor(customerRepository: ICustomerRepository){
        this.cacheConfiguration = new CacheConfiguration();
        this.customerRepository = customerRepository;
    }
    async registerUser(name: string, document: string, email: string) {
        console.log("Chegou register User " + name + "  " + document + "  " + email);
        const dados = {
            "document": document,
            "name": name,
            "email": email,
            "created": false
        }

        const config = {
            headers: {
                'Content-Type': 'application/json' // Definindo o cabeçalho Content-Type como application/json
            }
        };

        
         // Chamada para a função Lambda
         console.log(process.env.AUTENTICACAO_URI);
         const response = await axios.post(process.env.AUTENTICACAO_URI, dados, config);
         console.log(response);
         console.log('Resposta da função Lambda:', response.data);

        if (response.data !== null && response.data !== undefined){
            const createCustomer = new CreateCustomer(this.customerRepository);
            const id = response.data
            const cpf = document;
            await createCustomer.execute({ id, name, cpf });
            return response.data;
        }else
            return false;
    }

    async authenticate(cpf: string) {
        const dados = {
            "document": cpf,
            "created": true
        }

        const config = {
            headers: {
                'Content-Type': 'application/json' // Definindo o cabeçalho Content-Type como application/json
            }
        };

        const response = await axios.post(process.env.AUTENTICACAO_URI, dados, config);
        console.log('Resposta da função Lambda:', response);

        if (response.data !== null && response.data !== undefined){
            await this.cacheConfiguration.salvarTokenNoCache(response.data);
            await this.cacheConfiguration.obterTokenDoCache();
            return response.data;
        } 
        else    
            return false;
    }
}