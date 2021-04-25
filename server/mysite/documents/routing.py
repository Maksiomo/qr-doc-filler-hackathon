from mysite.wsgi import * 
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
#import comapp.routing as routing
from django.urls import path, re_path
from . import consumers

#application = ProtocolTypeRouter({
    # (http->django views is added by default)
 #   'websocket': AuthMiddlewareStack(
  #      URLRouter(
   #         routing.websocket_urlpatterns
    #    )
    #),
#})


websocket_urlpatterns = [
    re_path(r'documents/$', consumers.WebsocketConsumer),
]