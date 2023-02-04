from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class restaurants(models.Model):
    name = models.CharField(max_length=200)
    x = models.FloatField()
    y = models.FloatField()
    ratenum = models.FloatField()
    ratetext = models.TextField()

    class Meta:
        db_table = 'restaurants'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'

