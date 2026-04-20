const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3400;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(function(req, res) {
  var url = req.url === '/' ? '/index.html' : req.url;
  var ext = path.extname(url);
  var filePath = path.join(__dirname, url);
  
  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('<h1>404 Not Found</h1>');
      return;
    }
    res.writeHead(200, {'Content-Type': MIME[ext] || 'text/plain'});
    res.end(data);
  });
});

server.listen(PORT, function() {
  console.log('Modonix server running at http://localhost:' + PORT);
});
