from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    if(request == None):
        return HttpResponse("Invalid request")
    else:
        #name = request.name
        #lastName = request.lastName
        #otch = request.otch
        return HttpResponse("Server recieved info")

# Create your views here.
