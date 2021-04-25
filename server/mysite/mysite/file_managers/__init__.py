import json

from server.mysite.mysite.file_managers.DocumentManager import decodeDataUrl, fillAndConvert
from server.mysite.mysite.file_managers.PostManager import send_email
from server.mysite.mysite.file_managers.LogsManager import saveLog

info_folder = "../../../../data/"
logs_folder = "../../../../logs/"
config_folder = "../../../../config/"
form_file_name = "form"

if __name__ == "__main__":
    with open(info_folder + 'test.json', 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    with open(config_folder + 'signature.json', 'r', encoding='utf-8') as json_file:
        formData = json.load(json_file)


    code = data.get("signature")
    uuid = data.get("uuid")
    email = data.get("email")
    formList = data.get("docTypes")
    files = []

    saveLog(logs_folder, uuid, data)

    for form in formList:
        fillAndConvert(info_folder, form, data, uuid, formData)
        files.append(info_folder + form + "-user-" + uuid + ".pdf")

    send_email(email, "Тестовая тема", "Тестовое описание", files, config_folder)