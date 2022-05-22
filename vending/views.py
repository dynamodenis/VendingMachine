from django.shortcuts import render
from .models import Lead, Products, VendingMachine
from rest_framework import viewsets,permissions
from rest_framework.response import Response
from .serializers import ProductsSerializer, VendingMachineSerializer
from django.db import transaction

# Create your views here.
class ProductsViewSets(viewsets.ModelViewSet):
    vending_machine_class = VendingMachineSerializer
    product_class = ProductsSerializer
    
    def list(self, request):
        products = Products.objects.all()
        serializer = self.product_class(products, many=True, context={'request': request})
        return Response(dict(success=True, data=serializer.data, message="All Products"))
    
    def create(self,request):
        data = request.data.copy()
        print(data)     
        serializer = self.product_class(data=data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(dict(success=True, message='Product Added Successfully', data=serializer.data))

    def update(self, request):
        try:
            with transaction.atomic():
                data = request.data
                product = Products.objects.get(id=data.get('id'))
                serializer = self.product_class(product, data=data, context={'request': request})
                serializer.is_valid(raise_exception=True)
                product = serializer.save()
                response = self.product_class(product, context={'request': request}).data
                return Response(dict(success=True, message="Product has been updated", data=response))
        except Exception as e:
            return Response(dict(success=False, message="Could not update product. Please try again later"), status=status.HTTP_501_NOT_IMPLEMENTED)