# Generated by Django 4.0.3 on 2023-02-10 12:08

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_rest_data_loc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rest_data',
            name='loc',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(max_length=200), size=None),
        ),
    ]