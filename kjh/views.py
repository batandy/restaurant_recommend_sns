from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import restaurant
from .serializers import TestDataSerializer
# Create your views here.
from django.http import HttpResponse


def index(request):
    return render(request,"kjh/index.html")


@api_view(['GET'])
def getTestdatas(request):
    datas = restaurant.objects.all()
    serializer=TestDataSerializer(datas,many=True)
    return Response(serializer.data)