"""
ASGI config for mysite project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os
from channels.routing import get_default_application

from .wsgi import *
from channels.routing import ProtocolTypeRouter
from channels.routing import ProtocolTypeRouter, URLRouter

import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
from django.core.asgi import get_asgi_application
import django
import sys
sys.path.append('../..')
from documents import routing
from documents.consumers import DocumentsConsumer

from channels.layers import get_channel_layer
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),

    "websocket": AuthMiddlewareStack(
        URLRouter([
            url(r"^documents/$", DocumentsConsumer.as_asgi()),
        ])
    ),
})

#application = ProtocolTypeRouter({
 #   "http": get_asgi_application(),
  #  "websocket": AuthMiddlewareStack(
        #URLRouter(
         #   mysite.websocket_urlpatterns
        #)
   # ),
#})

#channel_layer = get_channel_layer()

