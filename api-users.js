const url = require('url');
const fs = require('fs');
const crypto = require("crypto");

let users = new Array();
if (fs.existsSync("users.json")){
    users = JSON.parse(fs.readFileSync("users.json"));
}

function rozbijheslo(pw) {
    let mixpw = crypto.createHash("sha512").update(pw).digest("hex");
    return mixpw;
}


exports.apiUsers = function(req, res) {
    res.writeHead(200, {"Content-type": "application/json"});
    let q = url.parse(req.url, true);
    if (req.pathname == "/user/list") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    }
    else if (req.pathname == "/user/add"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        let userexists = false;
        obj.login = req.parameters.name;
        for (let u of users) {
            if (u.login === obj.login) {
                userexists = true;
                break;
            }
        }
        if (userexists) {
            obj.error = "Tak to asi nepude, frajírku! Takhle už se totiž někdo jmenuje :/";
        } else {
            obj.password = rozbijheslo(req.parameters.pass);
            users.push(obj);
            fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
        }
        res.end(JSON.stringify(obj));

    }};