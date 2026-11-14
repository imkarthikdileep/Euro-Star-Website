// server.js - Production Entry File for Hostinger Node.js
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

process.env.NODE_ENV = 'production';
process.env.PORT = String(port);
process.env.HOSTNAME = hostname;

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  console.log(`[server.js] Launching Next.js standalone server on ${hostname}:${port}...`);
  require(standaloneServer);
} else {
  console.log(`[server.js] Standalone bundle not found. Starting standard Next.js on ${hostname}:${port}...`);
  const http = require('http');
  const next = require('next');

  const app = next({ dev: false, dir: __dirname });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    http.createServer((req, res) => handle(req, res)).listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  }).catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
