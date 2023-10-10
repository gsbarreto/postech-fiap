import InMemoryClientRepository from "./adapter/driven/InMemoryClientRepository";
import ClientController from "./adapter/driver/clientController";
import ClientService from "./core/applications/services/userService";
import server from "./server";
const PORT = process.env.PORT || 3000;

(async () => {
  const clientRepository = new InMemoryClientRepository();
  const clientService = new ClientService(clientRepository);
  const clientController = new ClientController(clientService);

  server.get(
    "/clients/:cpf",
    clientController.getClientByCPF.bind(clientController)
  );

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
