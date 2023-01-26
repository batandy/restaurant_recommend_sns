from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name='main'

urlpatterns = [
    path('', views.store, name='store'),
    path('a/', views.store, name='store'),
    path('test/',views.restaurant_view,name='dbview'),
    path('login/', auth_views.LoginView.as_view(template_name='main/login.html'), name='login'),
]