import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send({message: "Our first Express route"});
});

app.listen(8080, () => console.log("Server is now running on port", 8080));