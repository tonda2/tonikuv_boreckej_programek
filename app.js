const http = require("http");
const dateFormat = require("dateformat");
const fs = require('fs');
const url = require('url');
const apiDenVTydnu = require('./api-denvtydnu').apiDenVTydnu;
const apiSvatky = require('./api-svatky').apiSvatky;
const apiChat = require('./api-chat').apiChat;
const apiUsers = require('./api-users').apiUsers;
const apicislo = require('./api-cislo').apicislo;
const uniqid = require("uniqid");
const createSpaServer = require("spaserver").createSpaServer;
let citac = 0;
let druhejcitac = 0;

let msgs =  new Array();
let mereni = new Array();

function processApi(req, res) {
    let obj = {};
    if (req.pathname == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>objevils super tajnou wwebku kamo</body></html>");
    } else if (req.pathname.startsWith("/cislo")) {
        apicislo(req, res);
    }
    else if (req.pathname == "/jsondemo"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Martin";
        obj.prijmeni = "Borec";
        obj.rokNarozeni = 1847;
        res.end(JSON.stringify(obj));
    }
    else if (req.pathname == "/jsoncitac"){
        res.writeHead(200, {"Content-type": "application/json"});
        let pocet = {};
        druhejcitac ++;
        pocet.cislo = druhejcitac;
        res.end(JSON.stringify(pocet));
    }
    else if (req.pathname == "/denvtydnu"){
        apiDenVTydnu(req, res);
    }
    else if (req.pathname == "/svatky"){
        apiSvatky(req, res);
    }
    else if (req.pathname == "/chat/listmsgs"){
        apiChat(req, res);
    }
    else if (req.pathname == "/chat/addmsg") {
        apiChat(req, res);
    }
    else if (req.pathname == "/user/add"){
        apiUsers(req, res);
    }
    else if (req.pathname == "/user/list"){
        apiUsers(req, res);
    }
    else if (req.pathname == "/start"){
        let m = {};
        m.tmStart = new Date().getTime();
        let newId = uniqid();
        mereni [newId] = m;

        obj.id = newId;
        obj.status = "Mereni zapocato";
        res.end(JSON.stringify(obj));
    }
    else if (req.pathname == "/stop"){
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
}

createSpaServer(8080, processApi);