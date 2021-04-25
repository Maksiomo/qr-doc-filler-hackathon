import json

from src.server.DocumentManager import decodeDataUrl, fillAndConvert
from src.server.PostManager import send_email
from src.server.LogsManager import saveLog

info_folder = "../../data/"
logs_folder = "../../logs/"
form_file_name = "form"

if __name__ == "__main__":
    with open('../../data/test.json', 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    with open('../../config/signature.json', 'r', encoding='utf-8') as json_file:
        formData = json.load(json_file)

    code = data.get("signature")
    uuid = data.get("uuid")
    email = data.get("email")
    formList = data.get("docTypes")
    files = []

    saveLog(logs_folder, uuid, data)  # Сохраняю лог
    decodeDataUrl(info_folder, code, uuid)  # Декодирую подпись

    for form in formList:
        fillAndConvert(info_folder, form, data, uuid, formData)
        files.append(info_folder + form + "-user-" + uuid + ".pdf")

    # Отправляю письмо (адрес, тема письма, текст письма, приложенные файлы)
    send_email(email, "Копии документов", "", files)
