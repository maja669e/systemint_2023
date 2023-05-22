import express from "express"; 

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/webhooks", (req, res) => {
    const payload = JSON.parse(req.body.payload);
    console.log(payload.action); 
    console.log("Webhook registered for event");
    res.send({}); //Denne klient sender et respund til githb
});


app.listen(4000, () => console.log("Client is running on port 4000"));