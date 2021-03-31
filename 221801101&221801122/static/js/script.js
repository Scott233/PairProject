function requestTop10() {
    $.get('/PairHomework/api/top10', result => {
        const peak = top10[0];
        const top10 = JSON.parse(result);
        performSearch(peak);
        loadTrend(peak);
        renderTop10(top10);
    });
}

function performSearch(keyword) {
    $.get('/PairHomework/api/search?keyword=' + keyword, searchResult => renderSearchResult(JSON.parse(searchResult), keyword));
}

function loadTrend(keyword) {
    $.get('/PairHomework/api/trend?keyword=' + keyword, trendResult => renderTrendResult(JSON.parse(trendResult), keyword));
}

function renderTop10(top10) {
    console.log('top10: ');
    console.log(top10);

    const top10List = document.getElementById('top10');
    for (const item of top10) {
        const a = document.createElement('a');
        a.className = 'badge badge-primary top10-item';
        a.innerText = item;
        a.onclick = () => {
            performSearch(item);
            loadTrend(item);
        }
        top10List.append(a);
        top10List.append(' ');
    }
}

function renderSearchResult(searchResult, keyword) {
    console.log(keyword + ': ');
    console.log(searchResult);

    document.getElementById('search-input').value = keyword;

    const searchResultList = document.getElementById('search-result-list');
    searchResultList.innerHTML = null;
    for (const item of searchResult) {
        const li = document.createElement('li');
        li.className = 'list-group-item'
        {
            const h = document.createElement('h3');
            const r = '/' + keyword + '/g';
            h.innerHTML += item['title'].replace(eval(r), '<b class="highlight-span">' + keyword + '</b>');
            const span = document.createElement('span');
            span.innerText = '移除';
            span.className = 'btn btn-link';
            h.append(span);
            span.onclick = () => searchResultList.removeChild(li);
            li.append(h);
        }
        {
            const b = document.createElement('b');
            const p = document.createElement('p');
            b.append('发布年份：')
            p.append(b);
            p.append(item['year'].toString());
            li.append(p);
        }
        {
            const b = document.createElement('b');
            const p = document.createElement('p');
            b.append('关键词：');
            p.append(b);
            let keywords = item['keywords'];

            for (const kw of keywords) {
                if (kw === keyword)
                    p.innerHTML += '<b class="highlight-span">' + kw + '</b>';
                else
                    p.append(kw);
                p.append('; ');
            }
            li.append(p);
        }
        {
            const b = document.createElement('b');
            const p = document.createElement('p');
            b.append('链接：');
            p.append(b);
            const a = document.createElement('a');
            const h = item['link'];
            a.href = h;
            a.append(h);
            p.append(a);
            li.append(p);
        }
        {
            const ab = item['abstraction'];
            if (ab) {
                const b = document.createElement('b');               
                const p = document.createElement('p');
                b.append('摘要：');
                p.append(b);
                const r = '/' + keyword + '/g';
                p.innerHTML += ab.replace(eval(r), '<b class="highlight-span">' + keyword + '</b>');
                li.append(p);
            }
        }
        searchResultList.append(li);
    }
}

function renderTrendResult(trend, keyword) {
    console.log('trend: ')
    console.log(trend);

    const context = document.getElementById('trend-chart').getContext('2d');
    new Chart(context, {
        type: 'line',
        data: {
            labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
            datasets: [{
                label: keyword,
                data: trend,
                backgroundColor: 'gold',
            }]
        },
        options: {
            scales: {
                yAxis: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}

onload = () => {
    requestTop10();

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    searchButton.onclick = () => {
        const keyword = searchInput.value;
        performSearch(keyword);
        loadTrend(keyword);
    };
};