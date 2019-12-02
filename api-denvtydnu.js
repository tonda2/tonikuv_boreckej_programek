const DNY_V_TYDNU = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
const dateFormat = require("dateformat");


exports.apiDenVTydnu = function(req, res){
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