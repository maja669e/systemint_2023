from fastapi import FastAPI
from datetime import datetime
#poetry add requests
import requests

app = FastAPI()

@app.get("/date")
def get_date():
    return datetime.now()

@app.get("/datefromexpress")
def get_date_from_express():
    respone = requests.get("http://127.0.0.1:8080/date")
    date = respone.json()
    return date

    

@app.get("/datengrok")
def _():
    respone = requests.get("https://9864-195-249-146-100.eu.ngrok.io/date")
    date = respone.json()
    return date

