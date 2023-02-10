import json

with open('me.json', 'r') as me:
    #load reads json file.
    #loads reads json string.
    data = json.load(me)
    #print(data)
    print(json.dumps(data, indent=4))