import express from "express";
//import data from "../files/json/yamljson.json" assert { type: "json" }
import fs from "fs"
const app = express();
import txtToJSON from "txt-file-to-json";




app.get("/", (req, res) => {
    res.send({message: "Our first Express route"});
});


app.get("/txt", (req, res) => {

const dataInJSON = txtToJSON({filePath: "../files/me3.txt" });
res.json(dataInJSON)

});



app.get("/csv", (req, res) => {
    


});
    



 


app.listen(8080, () => console.log("Server is now running on port", 8080));