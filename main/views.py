from django.shortcuts import render, redirect
from . import models
from .models import restaurants
from django.core import serializers
from django.contrib.auth import authenticate, login
from main.forms import UserForm
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

def signup(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)  # 사용자 인증
            login(request, user)  # 로그인
            return redirect('index')
    else:
        form = UserForm()
    return render(request, 'main/signup.html', {'form': form})
