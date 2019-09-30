const http = require("http");
const dateFormat = require("dateformat");

const DNY_V_TYDNU = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];

let citac = 0;
let druhejcitac = 0;

http.createServer((req, res) => {
    if (req.url == "/") {
        citac++;
    }
    if (req.url == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>objevils super tajnou wwebku kamo</body></html>");
    }
    else if (req.url == "/jsondemo"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Martin";
        obj.prijmeni = "Borec";
        obj.rokNarozeni = 1847;
        res.end(JSON.stringify(obj));
    }
    else if (req.url == "/jsoncitac"){
        res.writeHead(200, {"Content-type": "application/json"});
        let pocet = {};
        druhejcitac ++;
        pocet.cislo = druhejcitac;
        res.end(JSON.stringify(pocet));
    }
    else if (req.url == "/denvtydnu"){
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let d = new Date();
        let obj = {};
        obj.systDatum = d;
        obj.denVTydnuCiselne = d.getDay();
        obj.denVTydnuCesky = DNY_V_TYDNU[d.getDay()] + " ";
        obj.datumCesky = d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
        obj.datumCeskyFormat = dateFormat(d, "dd.mm.yyyy");
        obj.casFormat =  dateFormat(d, "hh:mm:ss");
        obj.casCesky = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        res.end(JSON.stringify(obj));
    }
    else{
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}).listen(150);