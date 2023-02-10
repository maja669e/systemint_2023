const fs = require('fs');

let parseString = require('xml2js').parseString;
//install xml2js

let xml =  fs.readFileSync("me.xml", "utf8");
parseString(xml, function (err, result) {
    console.log(JSON.stringify(result));
});