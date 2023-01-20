from django.urls import path
from . import views

app_name='main'

urlpatterns = [
    path('a/', views.store, name='store'),
    path('test/',views.restaurant_view,name='dbview'),
]