import json
import datetime


def saveLog(logs_folder, uuid, data):
    dataTemp = {
        "time": str(datetime.datetime.now())
    }

    dataTemp.update(data)
    with open(logs_folder + "user-" + uuid + ".json", 'w', encoding='utf-8') as outfile:
        json.dump(dataTemp, outfile, ensure_ascii=False, indent=4)