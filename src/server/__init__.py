import json

from src.server.DocumentManager import decodeDataUrl, fillAndConvert
from src.server.PostManager import send_email

info_folder = "../../data/"
form_file_name = "form"

if __name__ == "__main__":
    with open('../../data/test.json', 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    with open('../../data/form.json', 'r', encoding='utf-8') as json_file:
        formData = json.load(json_file)

    code = data.get("signature")
    uuid = data.get("uuid")
    email = data.get("email")
    decodeDataUrl(info_folder, code, uuid)

    formList = ["form", "dogovor-obsluzhivaniya-akvariuma"]
    files = []

    for form in formList:
        fillAndConvert(info_folder, form, data, uuid, formData)
        files.append(info_folder + form + "-user-" + uuid + ".pdf")

    send_email(email, "Копия документа на обслуживание аквариума", "", files)