import json
import smtplib
import os

import mimetypes
from email import encoders
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart




# Функция для отправки письма
def send_email(addr_to, msg_subj, msg_text, files, config_folder):
    # Получение логина, пароля, SMTP_SSL и порта для подключения к почте
    data = getEmailInfo(config_folder, "post.json")

    if data == -1:
        print("Произошла ошибка при считывании post.json. Проверьте корректность введённых данных.")
        return -1

    login = data[0]
    password = data[1]
    SMTP_SSL = data[2]
    port = data[3]

    msg = MIMEMultipart()
    msg['From'] = login
    msg['To'] = addr_to
    msg['Subject'] = msg_subj

    body = msg_text
    msg.attach(MIMEText(body, 'plain'))

    for file in files:
        attach_file(msg, file)

    server = smtplib.SMTP_SSL(SMTP_SSL, port)
    # server.starttls()
    # server.ehlo
    # server.set_debuglevel(True)

    try:
        server.login(login, password)
    except smtplib.SMTPAuthenticationError:
        print
        'SMTPAuthenticationError'
    server.send_message(msg)
    server.quit()


# Функция присоединения файла к сообщению
def attach_file(msg, filepath):
    filename = os.path.basename(filepath)
    ctype, encoding = mimetypes.guess_type(filepath)
    if ctype is None or encoding is not None:
        ctype = 'application/octet-stream'
    maintype, subtype = ctype.split('/', 1)
    with open(filepath, 'rb') as fp:
        file = MIMEBase(maintype, subtype)
        file.set_payload(fp.read())
        fp.close()
        encoders.encode_base64(file)
    file.add_header('Content-Disposition', 'attachment', filename=filename)
    msg.attach(file)


# Функция считывания информации из конфига для почты
def getEmailInfo(config_folder, file_name):
    with open(config_folder + file_name, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)

    login = data.get("login")
    password = data.get("password")
    SMTP_SSL = data.get("SMTP_SSL")
    port = data.get("port")
    return [login, password, SMTP_SSL, port]
