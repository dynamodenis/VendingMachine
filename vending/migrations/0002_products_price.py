# Generated by Django 4.0.4 on 2022-05-22 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vending', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12),
        ),
    ]