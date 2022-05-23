from decimal import Decimal
from django.shortcuts import render
from .models import Coins, Lead, Products, VendingMachine
from rest_framework import viewsets,permissions,status
from rest_framework.response import Response
from .serializers import CoinsSerializer, ProductsSerializer, VendingMachineSerializer
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

    def buy(self,request):
        try:
            with transaction.atomic():
                data = request.data.copy()    
                product = Products.objects.get(id=data.get('id'))
                coin_type = product.coin_type
                price = product.price
                number = product.number
                if(float(data.get('number')) > number):
                    return Response(dict(success=False, message="Number of products greater than stocked products"), status=status.HTTP_501_NOT_IMPLEMENTED)
                # calculate change
                total_ksh = 0.0
                total_cents = 0.0
                total_ksh_change = 0.0
                total_cents_change = 0.0
                if(coin_type == 'KSH'):
                    # convert all coins into ksh
                    for coin in data.get('coins'):
                        if(coin.get('coin_type') == 'CENTS'):
                            convert_ksh = int(coin.get('price')) / 100
                            # Add converted cents to ksh to total ksh
                            total_ksh += convert_ksh
                        
                        elif(coin.get('coin_type') == 'KSH'):
                            total_ksh += int(coin.get('price'))
                    # calculate the total required amount
                    total_required_amount = int(data.get('number')) * price
                    # check if the paid amount is greater or equal tothe required amount
                    if(total_ksh >= total_required_amount):
                        # calculate the users change
                        total_ksh_change = float(total_ksh) - float(total_required_amount)
                        # Update the coins accordingly
                        for coin in data.get('coins'):
                            if(coin.get('coin_type') == 'CENTS'):
                                saved_coins = Coins.objects.filter(type = coin.get('coin_type')).first()
                                saved_coins.amount += Decimal(coin.get('price'))
                                saved_coins.save()
                            elif(coin.get('coin_type') == 'KSH'):
                                saved_coins = Coins.objects.filter(type = coin.get('coin_type')).first()
                                saved_coins.amount += Decimal(coin.get('price'))
                                saved_coins.save()
                    else:
                        # insufficeint paid amount
                        return Response(dict(success=True, message='Insufficient funds'), status=status.HTTP_501_NOT_IMPLEMENTED)

                elif(coin_type == 'CENTS'):
                    # convert all coins into cents
                    for coin in data.get('coins'):
                        if(coin.get('coin_type') == 'KSH'):
                            convert_cents = int(coin.get('price')) * 100
                            # Add converted cents to ksh to total cents
                            total_cents += convert_cents
                        
                        elif(coin.get('coin_type') == 'CENTS'):
                            total_cents += int(coin.get('price'))

                    # calculate the total required amount
                    total_required_amount = int(data.get('number')) * price

                    # check if the paid amount is greater or equal tothe required amount
                    if(total_cents >= total_required_amount):
                        # calculate the users change
                        total_cents_change = float(total_cents) - float(total_required_amount)
                        # Update the coins accordingly
                        
                        for coin in data.get('coins'):
                            if(coin.get('coin_type') == 'CENTS'):
                                saved_coins = Coins.objects.filter(type = coin.get('coin_type')).first()
                                saved_coins.amount += Decimal(coin.get('price'))
                                saved_coins.save()
                            elif(coin.get('coin_type') == 'KSH'):
                                saved_coins = Coins.objects.filter(type = coin.get('coin_type')).first()
                                saved_coins.amount += Decimal(coin.get('price'))
                                saved_coins.save()
                    else:
                        # insufficeint paid amount
                        return Response(dict(success=True, message='Insufficient funds'), status=status.HTTP_501_NOT_IMPLEMENTED)
                
                # Update coin inventory after returning change if there was any and return change in ksh or cents
                ksh_message = ""
                if(total_ksh_change > 0):
                    saved_coins = Coins.objects.all()
                    saved_coins = saved_coins.filter(type = 'KSH').first()
                    saved_coins.amount -= Decimal(total_ksh_change)
                    saved_coins.save()
                    ksh_message = f"you have ksh {total_ksh_change} change"

                cents_message = ""
                if(total_cents_change > 0):
                    saved_coins = Coins.objects.all()
                    saved_cents = saved_coins.filter(type = 'CENTS').first()
                    # check is there is enough balance to give change in cents
                    change_to_give = Decimal(total_cents_change) - saved_cents.amount
                    # if th change is greater than the cents available get extra money from KSH
                    if(change_to_give > 0):
                        saved_ksh = saved_coins.filter(type = 'KSH').first()
                        ksh_to_cents = saved_ksh.amount * 100
                        remaining_balance = ksh_to_cents - change_to_give
                        saved_ksh.amount = remaining_balance / 100
                        saved_ksh.save()
                    else:
                        # you have enough available sents to give as change
                        saved_cents.amount -= Decimal(total_cents_change)
                        saved_cents.save()
                    
                    cents_message = f"you have cents {total_cents_change} change"
                # Update product inventory
                product.number -= Decimal(data.get("number"))
                product.save()
                serializer = self.product_class(product, context={'request': request})
                return Response(dict(success=True, message=f'Product Bought Successfully {ksh_message} {cents_message}', data=serializer.data))

        except Exception as e:
            return Response(dict(success=False, message="Could not buy product. Please try again later"), status=status.HTTP_501_NOT_IMPLEMENTED)


class CoinsViewSets(viewsets.ModelViewSet):
    coins_class = CoinsSerializer
    
    def list(self, request):
        coins = Coins.objects.all()
        serializer = self.coins_class(coins, many=True, context={'request': request})
        return Response(dict(success=True, data=serializer.data, message="All coins"))

    def update(self, request):
        try:
            with transaction.atomic():
                data = request.data
                coins = Coins.objects.get(id=data.get('id'))
                serializer = self.coins_class(coins, data=data, context={'request': request})
                serializer.is_valid(raise_exception=True)
                coins = serializer.save()
                response = self.coins_class(coins, context={'request': request}).data
                return Response(dict(success=True, message="coin has been updated", data=response))
        except Exception as e:
            return Response(dict(success=False, message="Could not update coins. Please try again later"), status=status.HTTP_501_NOT_IMPLEMENTED)