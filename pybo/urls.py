from django.urls import path

from . import views

urlpatterns =[
    path('',views.index),
    path('<int:question_id>/',views.detail),  # pybo 안의 url이므로 pybo안의 url에 써준다
]