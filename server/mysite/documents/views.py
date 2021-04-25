from django.shortcuts import render
#from django.template import loader
from django.http import HttpResponse
from .models import PassengerInfo
from .forms import PassengerInfo

def home(request):
    return render(request, 'documents/mainpage.html', {})

def index(request):
    return render(request, 'documents/mainpage.html', {
        'contract_number': contract_number
    })