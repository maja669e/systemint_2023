from fastapi import FastAPI
import json

app = FastAPI()


@app.get("/")
def root():
    return {"message": "First FastAPI route"}


@app.get("/newroute")
def _():
    print(type({"message": "This is my second route"}))
    return {"message": "This is my second route"}



@app.get("/txt")
def txt():
# the file to be converted to
# json format
    filename = '../files/me.txt'
 
    # dictionary where the lines from
    # text will be stored
    dict1 = {}
 
    # creating dictionary
    with open(filename) as fh:
        
        for line in fh:
 
        # reads each line and trims of extra the spaces
        # and gives only the valid words
            command, description = line.strip().split(None, 1)
 
            dict1[command] = description.strip()
 
    # creating json file
    # the JSON file is named as me.json
    out_file = open("me.json", "w")
    json.dump(dict1, out_file, indent = 4, sort_keys = False)
    out_file.close()

    with open("me.json", "r") as read_file:
        data = json.load(read_file)
    return data





@app.get("/csv")
def csv():
    filename = '../files/me.csv'

    
