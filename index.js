const http = require("http");

let citac = 0;

http.createServer((req, res) => {
    if (req.url == "/") {
        citac++;
    }
    res.writeHead(200, {"Content-type": "text/html"});
    res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>Počet volání: " +citac + "</body></html>");
}).listen(150);

