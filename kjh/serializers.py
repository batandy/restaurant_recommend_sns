from rest_framework.serializers import ModelSerializer
from .models import restaurant

class TestDataSerializer(ModelSerializer):
    class Meta:
        model = restaurant
        fields = '__all__'