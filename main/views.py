from django.shortcuts import render
from . import models
from .models import restaurants
from django.core import serializers
import json
# Create your views here.
from django.http import HttpResponse


def index(request):
    search_text=request.GET.get('search_res')
    context={'search_text':search_text}
    restaurant_db = serializers.serialize("json", restaurants.objects.all())
    print(restaurant_db)
    return render(request,"main.html", context)
    return render(request,"base.html",{'restaurant_db':restaurant_db})


def store(request):
    return render(request,"main/storeinfo.html")
    

def restaurant_view(request):
    restaurant_form = restaurants.objects.all()
    print(restaurant_form)
    return render(request, 'storeinfo.html',{'restaurants':restaurant_form})

def getdata(request):
    restaurant_db = serializers.serialize("json", restaurants.objects.all())
    return HttpResponse(restaurant_db,content_type="text/json-comment-filtered")
