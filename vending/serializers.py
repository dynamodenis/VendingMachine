from rest_framework import serializers
from .models import *

class VendingMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendingMachine
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['name'] = instance.products.name if instance.products else None
        representation['number'] = instance.products.number if instance.products else None
        representation['price'] = instance.products.price if instance.products else None
        representation['coin_type'] = instance.coins.type if instance.coins else None
        representation['coin_amount'] = instance.coins.amount if instance.coins else None
        return representation

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class CoinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coins
        fields = '__all__'