const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.write('search');
    res.end();
});

server.listen(8001, '127.0.0.1');