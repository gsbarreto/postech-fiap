const NodeCache = require('node-cache');
const tokenCache = new NodeCache();
const jwt = require('jsonwebtoken');

export default class CacheConfiguration {
    
    async salvarTokenNoCache(token: string) {
        // Defina o tempo de expiração em segundos (por exemplo, 1 hora = 3600 segundos)
        const tempoExpiracaoSegundos = 3600;
        const decoded = await jwt.decode(token);
        tokenCache.set('clientId', decoded.sub, tempoExpiracaoSegundos);
    }

    // Função para recuperar o token do cache
    async obterTokenDoCache(): Promise<string|null> {
        const clientId = await tokenCache.get('clientId');

        if (clientId === undefined) {
            console.log('Token não encontrado no cache.');
            return null
        }

        console.log('Token encontrado no cache:', clientId);
        return String(clientId);
    }
}