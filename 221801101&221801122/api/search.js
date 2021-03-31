const fs = require('fs');

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i >= 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = this[i];
        this[i] = this[j];
        this[j] = t;
    }
}

function getSearchResult(paperArray, keyword) {
    const filteredArr = paperArray.filter(it => it['title'].indexOf(keyword) > -1 || it['keywords'].indexOf(keyword) > -1 || it['abstraction'] && it['abstraction'].indexOf(keyword) > -1);
    if (filteredArr.length <= 25)
        return filteredArr;
    const start = Math.floor(Math.random() * (filteredArr.length - 26))
    return filteredArr.slice(start, start + 25);
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


