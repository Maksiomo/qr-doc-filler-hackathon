import json
import smtplib                                              # Импортируем библиотеку по работе с SMTP
import os                                                   # Функции для работы с операционной системой, не зависящие от используемой операционной системы

# Добавляем необходимые подклассы - MIME-типы
import mimetypes                                            # Импорт класса для обработки неизвестных MIME-типов, базирующихся на расширении файла
from email import encoders                                  # Импортируем энкодер
from email.mime.base import MIMEBase                        # Общий тип
from email.mime.text import MIMEText                        # Текст/HTML
from email.mime.image import MIMEImage                      # Изображения
from email.mime.audio import MIMEAudio                      # Аудио
from email.mime.multipart import MIMEMultipart              # Многокомпонентный объект

info_folder = "../../data/"
file_name = "post.json"

def send_email(addr_to, msg_subj, msg_text, file):

    data = getEmailInfo(info_folder, file_name)

    if data == -1:
        print("Произошла ошибка при считывании " + file_name + ". Проверьте корректность введённых данных.")
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

    attach_file(msg, file)

    server = smtplib.SMTP_SSL(SMTP_SSL, port)
    #server.starttls()
    #server.ehlo
    #server.set_debuglevel(True)

    try:
        server.login(login, password)
    except smtplib.SMTPAuthenticationError:
        print
        'SMTPAuthenticationError'
    server.send_message(msg)
    server.quit()


def attach_file(msg, filepath):                             # Функция по добавлению конкретного файла к сообщению
    filename = os.path.basename(filepath)                   # Получаем только имя файла
    ctype, encoding = mimetypes.guess_type(filepath)        # Определяем тип файла на основе его расширения
    if ctype is None or encoding is not None:               # Если тип файла не определяется
        ctype = 'application/octet-stream'                  # Будем использовать общий тип
    maintype, subtype = ctype.split('/', 1)                 # Получаем тип и подтип
    if maintype == 'text':                                  # Если текстовый файл
        with open(filepath) as fp:                          # Открываем файл для чтения
            file = MIMEText(fp.read(), _subtype=subtype)    # Используем тип MIMEText
            fp.close()                                      # После использования файл обязательно нужно закрыть
    elif maintype == 'image':                               # Если изображение
        with open(filepath, 'rb') as fp:
            file = MIMEImage(fp.read(), _subtype=subtype)
            fp.close()
    elif maintype == 'audio':                               # Если аудио
        with open(filepath, 'rb') as fp:
            file = MIMEAudio(fp.read(), _subtype=subtype)
            fp.close()
    else:                                                   # Неизвестный тип файла
        with open(filepath, 'rb') as fp:
            file = MIMEBase(maintype, subtype)              # Используем общий MIME-тип
            file.set_payload(fp.read())                     # Добавляем содержимое общего типа (полезную нагрузку)
            fp.close()
            encoders.encode_base64(file)                    # Содержимое должно кодироваться как Base64
    file.add_header('Content-Disposition', 'attachment', filename=filename) # Добавляем заголовки
    msg.attach(file)                                        # Присоединяем файл к сообщению



def getEmailInfo(info_folder, file_name):
    with open(info_folder + file_name, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)

    login = data.get("login")
    password = data.get("password")
    SMTP_SSL = data.get("SMTP_SSL")
    port = data.get("port")
    return [login, password, SMTP_SSL, port]


