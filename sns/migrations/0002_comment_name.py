# Generated by Django 4.1.1 on 2023-02-03 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sns', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='name',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
