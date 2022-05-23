from django.urls import path


from .views import *

app_name = 'vending_machine'

urlpatterns = [
    path('products/view', ProductsViewSets.as_view({'get': 'list'}), name='products-view'),
    path('products/create', ProductsViewSets.as_view({'post': 'create'}), name='products-create'),
    path('products/update', ProductsViewSets.as_view({'put': 'update'}), name='products-update'),
    path('products/buy', ProductsViewSets.as_view({'post': 'buy'}), name='products-buy'),

    path('coins/view', CoinsViewSets.as_view({'get': 'list'}), name='coins-view'),
    path('coins/update', CoinsViewSets.as_view({'put': 'update'}), name='coins-update'),
]