from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from sns.models import Post,Comment


class UserForm(UserCreationForm):
    email = forms.EmailField(label="이메일")

    class Meta:
        model = User
        fields = ("username", "password1", "password2", "email")

class PostForm(forms.ModelForm):
    class Meta:
        model=Post
        fields=['subject','content']
        labels={
            'subject':'제목',
            'content':'내용',
        }

class CommentForm(forms.ModelForm):
    class Meta:
        model=Comment
        fields=['content']