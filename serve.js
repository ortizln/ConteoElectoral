const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4201;
const WEB_ROOT = 'C:\\Users\\Alexi\\Documents\\PROYECTOS\\ConteoElectoral\\frontend\\dist\\conteo-electoral\\browser';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url;
  const basePrefix = '/conteo-electoral';
  if (urlPath.startsWith(basePrefix)) {
    urlPath = urlPath.slice(basePrefix.length) || '/';
  }
  let filePath = path.join(WEB_ROOT, urlPath === '/' ? 'index.html' : urlPath);
  
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // SPA fallback
        fs.readFile(path.join(WEB_ROOT, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, 'localhost', () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});
