const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const fs = require('fs'); // Para manipular arquivos

server.use(middlewares);
server.use(jsonServer.bodyParser); // Garante que o JSON seja lido corretamente

// Middleware para garantir ID numérico incremental
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/alunos') {
    const db = JSON.parse(fs.readFileSync('server/db.json', 'utf-8')); // Lê o DB atual
    const alunos = db.alunos || [];

    // Encontra o maior ID e incrementa
    const nextId = alunos.length ? Math.max(...alunos.map(a => a.id || 0)) + 1 : 1;

    req.body.id = nextId; // Define o ID no novo objeto
  }
  next();
});

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🔥 JSON Server rodando em http://localhost:${PORT}`);
});
