from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

app_name='main'

urlpatterns = [
    path('', views.index, name='index'),
    path('a/', views.index, name='index'),
    path('test/',views.restaurant_view,name='dbview'),
    path('login/', auth_views.LoginView.as_view(template_name='main/login.html'), name='login'),
    path('logout/',auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', views.signup, name='signup'),
    # path('sns/',views.sns,name='sns')
    path('sns/',views.sns, name='sns'),
    path('sns/<int:post_id>/',views.detail,name='detail'),
    path('sns/post',views.sns_post,name='post_create'),
    path('sns/comment/<int:post_id>/',views.sns_comment,name='comment_create'),
    path('mypage/', views.mypage, name='mypage'),
]