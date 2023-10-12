import ClientService from "../../core/applications/services/clientService";
import { Request, Response } from "express";

export default class ClientController {
  constructor(private readonly clientService: ClientService) {}

  async getClientByCPF(req: Request, res: Response) {
    const { cpf } = req.params;
    const client = await this.clientService.getClientByCPF(cpf);
    res.status(200).json(client);
  }
}
