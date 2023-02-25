import express from "express";
const app = express();
const PORT = 8080;


app.get("/date", (req, res) => {
    res.send(new Date());
});

app.get("/datefromfastapi", async (req, res) => {
/*task get the date from fastapi. Complete the following*/

const response = await fetch("http://127.0.0.1:8000/date");
const date = await response.json();
res.send(date);

/*fetch("http://127.0.0.1:8000/date").then(res => res.json())
.then(json => res.send(json));*/
});


app.listen(PORT, () => console.log("Server is now running on port", PORT));