const fs = require('fs');

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = this[j];
        this[j] = this[i];
        this[i] = t;
    }
}

function getSearchResult(paperArray, keyword) {
    paperArray.shuffle();
    const searchResult = [];
    for (const paper of paperArray) {
        if (searchResult.length > 24) break;

        if (paper['title'].indexOf(keyword) > -1) {
            searchResult.push(paper);
            continue;
        }
        if (paper['keywords'].indexOf(keyword) > -1) {
            searchResult.push(paper);
            continue;
        }
        const abstraction = paper['abstraction'];
        if (abstraction && abstraction.indexOf(keyword) > -1) {
            searchResult.push(paper);
        }
    }
    return searchResult;
}

fs.readFile('data.json', 'utf-8', (err, data) => {
    const paperArray = JSON.parse(data);

    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        const url = decodeURI(req.url);
        const index = url.lastIndexOf('=') + 1;
        const keyword = url.substring(index);
        const searchResult = getSearchResult(paperArray, keyword);
        res.write(JSON.stringify(searchResult));
        res.end();
    });
    server.listen(8001, '127.0.0.1');
});


