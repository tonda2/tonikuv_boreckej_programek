const url = require('url');
let msgs =  new Array();
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

exports.apiChat = function(req, res){
    res.writeHead(200, {"Content-type": "application/json"});
    let q = url.parse(req.url, true);
    if (q.pathname == "/chat/listmsgs"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    }
    else if (q.pathname == "/chat/addmsg") {
        let data = "";
        req.on('data', function (chunk) {
            try {
                data += chunk;
            } catch (e) {
                console.error(e);
            }
        })
        req.on('end', function () {
            if (data) {
                let body = JSON.parse(data);
                res.writeHead(200, {"Content-type": "application/json"});
                let obj = {};
                obj.text = entities.encode(body.nick) + ": " + entities.encode(body.msg);
                obj.time = new Date();
                msgs.push(obj);
                res.end(JSON.stringify(obj));
            };
        });
    };
};