from django.shortcuts import render
#from django.template import loader
from django.http import HttpResponse
from .models import AquariumInfo
from .forms import AquariumInfo

def mainpage(request):
    return render(request, 'documents/mainpage.html')

def index(request):
    return render(request, 'documents/mainpage.html', {
        'contract_number': contract_number
    })