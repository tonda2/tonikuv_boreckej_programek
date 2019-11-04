const url = require('url');

exports.apicislo = function(req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
    let obj = {};
    const MIN_NC = 5;
    const MAX_NC = 10;
    let nc;
    nc = Math.random();
    console.log(nc);
    nc = MIN_NC + Math.trunc((MAX_NC-MIN_NC+1)*nc);
    console.log(nc);
    obj.nahodnecislo = nc;
    res.end(JSON.stringify(obj));
}
