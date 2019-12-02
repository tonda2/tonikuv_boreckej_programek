const http = require("http");
const dateFormat = require("dateformat");
const fs = require('fs');
const url = require('url');
const apiDenVTydnu = require('./api-denvtydnu').apiDenVTydnu;
const apiSvatky = require('./api-svatky').apiSvatky;
const apiChat = require('./api-chat').apiChat;
const apicislo = require('./api-cislo').apicislo;
const uniqid = require("uniqid");
let citac = 0;
let druhejcitac = 0;

let msgs =  new Array();
let mereni = new Array();

function processStaticFiles(res, fileName){
    fileName = fileName.substr(1); //zkopiruju od druheho znaku
    console.log(fileName);
    let contentType = "text/html";
    if (fileName.endsWith(".png")){
        contentType = "image/png";
    }
    else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")){
        contentType = "image/jpeg";
    }

    if(fs.existsSync(fileName)){
        fs.readFile(fileName, function(err, data) {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        });
    }
    else {
        res.writeHead(404);
        res.end();
    }
}

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let obj = {};
    if (req.url == "/") {
        citac++;
        processStaticFiles(res, "/index.html");
        return;
    }
    if (q.pathname.length - q.pathname.lastIndexOf(".") < 6){
        processStaticFiles(res, req.url);
        return;
    }
    if (q.pathname == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>objevils super tajnou wwebku kamo</body></html>");
    } else if (q.pathname.startsWith("/cislo")) {
        apicislo(req, res);
    }
    else if (q.pathname == "/jsondemo"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Martin";
        obj.prijmeni = "Borec";
        obj.rokNarozeni = 1847;
        res.end(JSON.stringify(obj));
    }
    else if (q.pathname == "/jsoncitac"){
        res.writeHead(200, {"Content-type": "application/json"});
        let pocet = {};
        druhejcitac ++;
        pocet.cislo = druhejcitac;
        res.end(JSON.stringify(pocet));
    }
    else if (q.pathname == "/denvtydnu"){
        apiDenVTydnu(req, res);
    }
    else if (q.pathname == "/svatky"){
        apiSvatky(req, res);
    }
    else if (q.pathname == "/chat/listmsgs"){
        apiChat(req, res);
    }
    else if (q.pathname == "/chat/addmsg") {
        apiChat(req, res);
    }
    else if (q.pathname == "/start"){
        let m = {};
        m.tmStart = new Date().getTime();
        let newId = uniqid();
        mereni [newId] = m;

        obj.id = newId;
        obj.status = "Mereni zapocato";
        res.end(JSON.stringify(obj));
    }
    else if (q.pathname == "/stop"){
        let tmStop = new Date().getTime();
        let q = url.parse(req.url, true);
        let id = q.query.id;
        let m = mereni[id];
        obj.status = "Mereni ukonceno";
        obj.durSec = ((tmStop - m.tmStart)/1000).toFixed(1);
        res.end(JSON.stringify(obj));
    }
    else{
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}).listen(8080);