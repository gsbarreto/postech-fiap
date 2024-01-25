# Use a imagem oficial do MongoDB com a tag latest
FROM mongo:latest

# Copie o script de inicialização para a pasta de inicialização do MongoDB
COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js

# Expõe a porta padrão do MongoDB
EXPOSE 27017
