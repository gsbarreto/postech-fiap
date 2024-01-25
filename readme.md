# Tech Challenger Pos Tech Arquitetura de Software - Fase 2

### Para rodar a aplicação
```sh
docker compose up --build
```

> Caso apareça o erro: "Error response from daemon: user declined directory sharing ...." <br>
> É necessário configurar o file sharing no docker <br>
> Fonte: https://stackoverflow.com/questions/70877785/docker-error-response-from-daemon-user-declined-directory-sharing

### Acesso app (porta default)
{{dominio}}:30100/...

### Postman collection
https://github.com/gsbarreto/postech-fiap/blob/main/resources/postman-collection/Tech-challenge-Fase1.postman_collection.json

### Client Mongo (porta default)
{{dominio}}:30300 <br>
login:admin <br>
senha:pass

### Swagger (porta default)
{{dominio}}:30100/api-docs/

### Stacks
- Typescript
- NodeJS
- Framework Express
- Mongo database

### Integrantes Grupo 76

Gabriel da Silva Barreto<br>
gabrieldasilvabarreto@hotmail.com

Marcelo Gomes do Nascimento <br>
marcelogn2010@hotmail.com

Bruno Grun <br>
grunbruno@gmail.com 

