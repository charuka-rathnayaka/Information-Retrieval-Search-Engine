import os
import json
from datetime import datetime

# Opening JSON file
json_file = open('./json_edited.json',encoding="utf-8")

# returns JSON object as
# a dictionary
data = json.load(json_file)
with open("final_songs_JSON.json", "w",encoding="utf-8") as outfile:
    for json_ in data['songs']:
        json.dump(json_, outfile,ensure_ascii=False)
        outfile.write('\n')
json_file.close()