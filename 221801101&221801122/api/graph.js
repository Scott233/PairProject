const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.write('graph');
    res.end();
});

server.listen(8002, '127.0.0.1');