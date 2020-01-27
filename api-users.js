const url = require('url');
const fs = require('fs');
const crypto = require("crypto");

let users = new Array();
if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));

}

let loggedUsers = new Array();

function rozbijheslo(pw) {
    let mixpw = crypto.createHash("sha512").update(pw).digest("hex");
    return mixpw;
}


exports.apiUsers = function (req, res) {
    res.writeHead(200, {"Content-type": "application/json"});
    let q = url.parse(req.url, true);
    if (req.pathname == "/user/list") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    } else if (req.pathname == "/user/add") {
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

    } else if (req.pathname == "/login") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        let login = req.parameters.login;
        let found = false;
        obj.error = "asi ne, soráč";
        for (let u of users) {
            if (u.login === login) {
                found = true;
                if (u.password === rozbijheslo(req.parameters.password)) {
                    obj.name = u.name;
                    obj.error = null;
                    let token = crypto.randomBytes(16).toString('hex'); //32 nahodnych znaku
                    obj.token = token;
                    let objLoggedUsers = {};
                    objLoggedUsers.name = u.name;
                    loggedUsers[token] = objLoggedUsers;
                }
                break;
            }
        }
        res.end(JSON.stringify(obj));
    }

};

exports.getLoggedUser = function (token) {
    let u = loggedUsers[token];
    return u;
}