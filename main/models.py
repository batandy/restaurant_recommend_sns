from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class restaurantsdb(models.Model):
    name = models.CharField(max_length=200)
    x = models.FloatField()
    y = models.FloatField()
    market_address = models.TextField()
    detail_address = models.TextField()
    food_category = models.TextField()
    market_number = models.CharField(max_length=200)

    class Meta:
        db_table = 'restaurants_data'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'


