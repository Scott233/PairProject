const fs = require('fs');

function getTrend(paperArray, keyword) {
    const trend = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const paper of paperArray) {
        const year = paper['year'];
        const keywords = paper['keywords'];
        if (year<2020 && year>=2010)
            if (keywords.indexOf(keyword) > -1)
                ++trend[year - 2010]
    }
    return trend;
}

fs.readFile('data.json', 'utf-8', ((err, data) => {
    const paperArray = JSON.parse(data);

    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        const url = decodeURI(req.url);
        const index = url.lastIndexOf('=') + 1;
        const keyword = url.substring(index);
        const trend = getTrend(paperArray, keyword);
        res.write(JSON.stringify(trend));
        res.end();
    });
    server.listen(8003, '127.0.0.1');
}));