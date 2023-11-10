const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

// Construa o caminho absoluto para db.json com base no diretório de trabalho atual
const dbPath = path.join(process.cwd(), 'db.json');

// Leia o conteúdo do arquivo db.json
const data = require(dbPath);

const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Exporte a API do servidor
module.exports = server;
