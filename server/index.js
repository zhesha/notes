const http = require('http');

const notes = [];

const proxy = http.createServer((req, res) => {
  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET',
    'Access-Control-Allow-Headers': 'content-type'
  };
  if (req.method === 'POST') {
    let queryData = '';
    req.on('data', function(data) {
      queryData += data;
      if (queryData.length > 1e6) {
        queryData = '';
        res.writeHead(413, { 'Content-Type': 'text/plain' }).end();
        req.connection.destroy();
      }
    });

    req.on('end', function() {
      const data = JSON.parse(queryData);
      notes.push(data);
      res.writeHead(200, header);
      res.end(JSON.stringify({ notes: notes }));
    });
  } else {
    res.writeHead(200, header);
    res.end(JSON.stringify({ notes: notes }));
  }
});

proxy.listen(1337, '127.0.0.1');
