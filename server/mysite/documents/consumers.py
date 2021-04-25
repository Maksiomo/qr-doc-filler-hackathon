import json
from channels.generic.websocket import WebsocketConsumer

class DocumentsConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    def disconnect(self, close_code):
        pass
    def ws_message(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['contract_number']

        self.send(text_data=json.dumps({
        message.reply_channel.send({
        "contract_number": message
        })
    }))