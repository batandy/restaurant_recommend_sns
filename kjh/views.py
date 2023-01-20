from django.shortcuts import render
from .models import restaurant
from . import models
# Create your views here.
from django.http import HttpResponse


def index(request):
    return render(request,"index.html")


def store(request):
    return render(request,"storeinfo.html")


def restaurant_view(request):
    restaurants = restaurant.objects.all()
    print(restaurants)
    return render(request, 'storeinfo.html',{"restaurants":restaurants})