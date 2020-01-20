const crypto = require("crypto");

function rozbijheslo(pw) {
    let mixpw = crypto.createHash("sha512").update(pwd).digest("hex");
    return mixpw;
}

let pwd = "Tondajeborec";
console.log(rozbijheslo(pwd));