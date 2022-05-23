from django.db import models
# from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=200, unique=True)
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null = True, related_name='leads')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class Products(models.Model):
    COIN_TYPES = (
        ('CENTS', 'Cents'),
        ('KSH', 'Kenya Shillings'),
    )
    name = models.CharField(max_length=100)
    number = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    coin_type = models.CharField(max_length=100,choices=COIN_TYPES, blank=True, null=True)
    # coins = models.ForeignKey('vending.Coins', on_delete=models.SET_NULL, null = True, related_name='coins')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
class Coins(models.Model):
    COIN_TYPES = (
        ('CENTS', 'Cents'),
        ('KSH', 'Kenya Shillings'),
    )

    type = models.CharField(max_length=100,choices=COIN_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.type

class VendingMachine(models.Model):
    products = models.ForeignKey('vending.Products', on_delete=models.SET_NULL, null = True, related_name='vending_products')
    coins = models.ForeignKey('vending.Coins', on_delete=models.SET_NULL, null = True, related_name='vending_coins')
    def __str__(self):
        return self.products.name