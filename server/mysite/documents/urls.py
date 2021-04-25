from django.urls import path

from . import views

urlpatterns = [
   path('', views.index, name = 'mainpage'),
   path('', views.index, name='home'),
   path('<int:contract_number>/', views.index, name='mainpage'),
]