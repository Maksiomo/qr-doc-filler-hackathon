import json

from src.server.DocumentManager import decodeDataUrl, fillAndConvert
from src.server.PostManager import send_email

info_folder = "../../data/"
file_name = "form-final"

if __name__ == "__main__":
    with open('../../data/test.json', 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)

    code = data.get("signature")
    decodeDataUrl(info_folder, code)

    fillAndConvert(info_folder, file_name, data)

    send_email("Semion.Kap2@gmail.com", "Тестовая тема", "Тест1231", "../../data/form-final.pdf")