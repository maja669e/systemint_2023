from fastapi import FastAPI
import json
import csv
import pandas as pd
import xmltodict
import yaml


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
    out_file = open("../files/json/txtjson.json", "w")
    json.dump(dict1, out_file, indent = 4, sort_keys = False)
    out_file.close()

    with open("../files/json/txtjson.json", "r") as read_file:
        data = json.load(read_file)
    return data



@app.get("/csv") 
#pip install pandas
def csvx():
    df = pd.read_csv (r'../files/me.csv')
    #Helps remove some 0 values
    df.apply(lambda x: [x.dropna()], axis=1).to_json (r'../files/json/csvjson.json')
    
    

    with open("../files/json/csvjson.json", "r") as read_file:
        data = json.load(read_file)
    return data


@app.get("/xml")
def xml():
    #pip install xmltodict
    with open("../files/me.xml") as xml_file:
     
        data_dict = xmltodict.parse(xml_file.read())
        # xml_file.close()
     
        # generate the object using json.dumps()
        # corresponding to json data
     
        json_data = json.dumps(data_dict)
     
        # Write the json data to output
        # json file
        with open("../files/json/xmljson.json", "w") as json_file:
            json_file.write(json_data)
            json_file.close()

    with open("../files/json/xmljson.json", "r") as read_file:
        data = json.load(read_file)
    return data



@app.get("/yaml")
def yamlx():
    #pip install pyyaml

    #Read YAML file
    with open('../files/me.yaml', 'r') as f:
        data = yaml.load(f, Loader=yaml.SafeLoader)

    # Write YAML object to JSON format
    with open('../files/json/yamljson.json', 'w') as f:
        json.dump(data, f, sort_keys=False)


    with open("../files/json/yamljson.json", "r") as read_file:
        data = json.load(read_file)
    return data


@app.get("/json")
def jsonx():
    # Opening JSON file
    f = open('../files/me.json')
  
    # returns JSON object as 
    # a dictionary
    data = json.load(f)
  
    # Closing file
    f.close()

    return data
