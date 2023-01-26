from django.shortcuts import render
from . import models
from .models import restaurants
# Create your views here.
from django.http import HttpResponse


def index(request):
    search_text=request.GET.get('search_res')
    context={'search_text':search_text}
    return render(request,"main.html", context)


def store(request):
    return render(request,"main/storeinfo.html")
    

def restaurant_view(request):
    restaurant_form = restaurants.objects.all()
    print(restaurant_form)
    return render(request, 'storeinfo.html',{"restaurants":restaurant_form})
