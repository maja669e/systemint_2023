import express from "express";
//import data from "../files/json/yamljson.json" assert { type: "json" }
import fs from "fs";
const app = express();
import txtToJSON from "txt-file-to-json";
import csvtojson from "csvtojson";
import convert from "xml-js";
import yaml from "js-yaml";



app.get("/", (req, res) => {
    res.send({message: "Our first Express route"});
});


app.get("/txt", (req, res) => {

const dataInJSON = txtToJSON({filePath: "../files/me3.txt" });
res.json(dataInJSON)

});



app.get("/csv", (req, res) => {
    //npm install --save csvtojson@latest
    // Convert a csv file with csvtojson
csvtojson()
.fromFile("../files/me.csv")
.then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
   console.log(jsonArrayObj); 
   res.send(jsonArrayObj)
 })
    
});
    

app.get("/xml", (req, res) => {
   //npm install xml-js
   function RemoveJsonTextAttribute(value,parentElement){
    try{
    var keyNo = Object.keys(parentElement._parent).length;
    var keyName = Object.keys(parentElement._parent)[keyNo-1];
    parentElement._parent[keyName] = value;
    }
    catch(e){}
    }
   const xml = fs.readFileSync('../files/me.xml', 'utf8');
   const result = convert.xml2json(xml, {compact: true, spaces: 4, ignoreDeclaration: true, textFn:RemoveJsonTextAttribute});
   res.send(result)
});



app.get("/yaml", (req, res) => {
    //npm install js-yaml
    const inputfile = '../files/me.yaml',
    outputfile = '../files/json/output.json',
    obj = yaml.load(fs.readFileSync(inputfile, {encoding: 'utf-8'}));
    // this code if you want to save
    fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));
    res.send(obj)
});


app.get("/json", (req, res) => {
    fs.readFile('../files/me.json', 'utf8', (err, fileContents) => {
        if (err) {
          console.error(err)
          return
        }
        try {
          const data = JSON.parse(fileContents)
          res.send(data)
          console.log(data)
        } catch(err) {
          console.error(err)
        }
      })
});

 


app.listen(8080, () => console.log("Server is now running on port", 8080));