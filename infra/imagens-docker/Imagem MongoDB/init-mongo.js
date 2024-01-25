const initializationFlag = db.getCollection("system").findOne({ key: "initialized" });

if (initializationFlag) {
  print('Banco de dados já inicializado. Pulando a inicialização...');
  quit();
}

db = new Mongo().getDB("test");

if (!db.customers.findOne()) {
  db.createCollection("customers", { capped: false });
  
  db.customers.insert({
    id: "038ec781-f173-4a96-9ed3-a79d079daf6f",
    name: "João Arruda",
    cpf: "57945822002",
  });

  db.customers.insert({
    id: "d8be5f97-80b2-4b3e-aa84-cf5250fb3578",
    name: "Francisca Oliveira",
    cpf: "53666152082",
  });
}

if (!db.orders.findOne()) {
  db.orders.insert({
    id: "e5bbb4c7-3da8-482d-b73b-dcfb7d6b4734",
    status: "pending",
    customer: {
      id: "038ec781-f173-4a96-9ed3-a79d079daf6f",
      name: "João Arruda",
      cpf: "00000000000",
    },
    items: [
      {
        product: {
          id: "a13b065c-5a7c-4b5d-9064-29deb5a596c0",
          name: "Batata Frita",
          description: "A mais crocante que você jamais vai comer!",
          price: 15,
          images: ["http://img.com"],
          category: "ACOMPANHAMENTO",
        },
        quantity: 2,
      },
    ],
  });
}

if (!db.products.findOne()) {
  db.createCollection("products", { capped: false });


  db.products.insert({
    id: "07ea43c2-515c-479e-9f89-321065e4c260",
    name: "Red Bull",
    description: "280 ml",
    price: 11,
    images: ["http://img.com"],
    category: "BEBIDA",
  });

  db.products.insert({
    id: "a13b065c-5a7c-4b5d-9064-29deb5a596c0",
    name: "BigMac",
    description: "Pão, Salada e Molho Especial",
    price: 25,
    images: ["http://img.com"],
    category: "LANCHE",
  });

  db.products.insert({
    id: "a13b065c-5a7c-4b5d-9064-29deb5a596c0",
    name: "Batata Frita",
    description: "A mais crocante que você jamais vai comer!",
    price: 15,
    images: ["http://img.com"],
    category: "ACOMPANHAMENTO",
  });

}

db.getCollection("system").insert({ key: "initialized", value: true });
  

