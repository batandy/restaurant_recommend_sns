from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    return render(request,"index.html")


def store(request):
    return render(request,"storeinfo.html")
    