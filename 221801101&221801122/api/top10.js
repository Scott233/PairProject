const fs = require('fs');

function getTop10(jsonArr) {
    const frequencyMap = {};
    for (let i = 0; i < jsonArr.length; i++) {
        const keywords = jsonArr[i]['keywords'];
        for (let j = 0; j < keywords.length; j++) {
            if (frequencyMap[keywords[j]])
                ++frequencyMap[keywords[j]];
            else frequencyMap[keywords[j]] = 1;
        }
    }
    const keys = Object.keys(frequencyMap);
    keys.sort((a, b) => frequencyMap[b] - frequencyMap[a]);
    return keys.slice(0, 10);
}

fs.readFile('data.json', 'utf-8', (err, data) => {
    const top10 = getTop10(JSON.parse(data));
    const http = require('http');
    const server = http.createServer(((req, res) => {
        res.writeHead(200);
        res.write(JSON.stringify(top10));
        res.end();
    }));
    server.listen(8002, '127.0.0.1');
});
