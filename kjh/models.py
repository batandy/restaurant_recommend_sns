from django.db import models


# Create your models here.
class restaurant(models.Model):
    name = models.CharField(max_length=200)
    x = models.FloatField()
    y = models.FloatField()
    ratenum = models.FloatField()
    ratetext = models.TextField()

    class Meta:
        db_table = 'restaurant'
