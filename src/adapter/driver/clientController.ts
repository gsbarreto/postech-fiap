import ClientService from "../../core/applications/services/userService";
import { Request, Response } from "express";

export default class ClientController {
  constructor(private readonly clientService: ClientService) {}

  async getClientByCPF(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const client = await this.clientService.getClientByCPF(cpf);
      return res.status(200).json(client);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
