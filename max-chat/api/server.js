// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')

const server = jsonServer.create()

// Uncomment to allow write operations
const fs = require('fs');
const path = require('path');
const filePath = path.join('./db.json');
if (!fs.existsSync(filePath)) {
  console.error('O arquivo db.json não foi encontrado.');
  process.exit(1);
}
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);
const router = jsonServer.router(db)
console.log('Caminho absoluto do db.json:', filePath);
console.log('Conteúdo do db.json:', data);

// Comment out to allow write operations
// const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server