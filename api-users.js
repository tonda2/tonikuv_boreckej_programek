const url = require('url');
let users =  new Array();
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

exports.apiUsers = function(req, res){
    res.writeHead(200, {"Content-type": "application/json"});
    let q = url.parse(req.url, true);
    if (q.pathname == "/user/list"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    }
    else if (q.pathname == "/user/add") {
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
                obj.text = entities.encode(body.name) + ": " + entities.encode(body.pass);
                obj.time = new Date();
                users.push(obj);
                res.end(JSON.stringify(obj));
            };
        });
    };
};