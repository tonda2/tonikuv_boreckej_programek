const url = require('url');
let nc;

exports.apicislo = function(req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
    let obj = {};
    const MIN_NC = 5;
    const MAX_NC = 10;
    nc = Math.random();
    nc = MIN_NC + Math.trunc((MAX_NC-MIN_NC+1)*nc);
    obj.nahodnecislo = nc;
    res.end(JSON.stringify(obj));

    if (q.pathname == "/cislo/zkontroluj"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.rozhodnuti = "špatně";
        obj.cislo = q.query["c"];
        if (obj.cislo === nc){
            obj.rozhodnuti = "správně";
        }
        else {
            obj.rozhodnuti = "špatně";
        }
        res.end(JSON.stringify(obj));
    }
}