from django.shortcuts import render, redirect, get_object_or_404
from . import models
from .models import restaurantsdb
from sns.models import Post, Comment
from .forms import PostForm,CommentForm
from django.utils import timezone
from django.core import serializers
from django.contrib.auth import authenticate, login
from main.forms import UserForm
import json
# Create your views here.
from django.http import HttpResponse



def index(request):
    search_text=request.GET.get('search_res')
    context={'search_text':search_text}
    restaurant_db = serializers.serialize("json", restaurantsdb.objects.all())
    return render(request,"main.html", context)
    return render(request,"base.html",{'restaurant_db':restaurant_db})

def store(request):
    return render(request,"main/storeinfo.html")
    

def restaurant_view(request):
    restaurant_form = restaurantsdb.objects.all()
    return render(request, 'storeinfo.html',{'restaurants':restaurant_form})

def getdata(request):
    restaurant_db = serializers.serialize("json", restaurantsdb.objects.all())
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
    
def sns(request):
    post_list=Post.objects.order_by('-create_date')
    context={'post_list':post_list}
    return render(request,"sns.html",context)
    
def detail(request,post_id): # 게시글 내용
    post=Post.objects.get(id=post_id)
    context={'post':post}
    return render(request,'post_detail.html',context)

def sns_comment(request,post_id): # 댓글 작성
    if request.method=='POST':
        post=get_object_or_404(Post,pk=post_id)
        comment_form=CommentForm(request.POST)
        if comment_form.is_valid():
            comment=comment_form.save(commit=False)
            comment.post=post
            comment.user=request.user
            comment.create_date=timezone.now()
            comment.save()
        return redirect('main:detail',post_id=post.id)

# def comment_delete(request,post_id,comment_id): # 댓글 삭제

def sns_post(request): # 게시글 작성
    if request.method=='POST':
        form=PostForm(request.POST)
        if form.is_valid():
            post=form.save(commit=False)
            post.user=request.user
            post.create_date=timezone.now()
            post.save()
            return redirect('main:sns')
    else:
        form=PostForm()
    return render(request,'post_create.html',{'form':form})

def mypage(request):
    return render(request,"main/mypage.html")