import express from "express";
import webhooksRouter from "./webhooks.js"
import registerRouter from "./register.js"

const app = express(); 


app.use(express.json());
app.use(webhooksRouter);
app.use(registerRouter);


const PORT  = 3000 
app.listen(PORT, () => console.log("Server is running on port ", PORT))