## Welcome to Vending Machine

This has been created using Python Django, React and Sqlite databse.

### Requirements

- Python 3.8
- Pipenv

### Running application

- Unzip the files and open it in vscode editor.
- Run it on virtual environment using `pipenv shell`
- Install dependencies using `pipenv install`
- Run migrations using `python3 manage.py makemigrations` then migrate `python3 manage.py migrate`
- Run the application `python3 manage.py runserver` and on the browser go to the given url

### Usage

#### Landing

On the landing application you can see all available products in the vending machine. As a user you have options to buy a product. On the buy product Modal/Form, select number/packets to buy and the coins you have. i.e you can insert coins of different type and incase of extra money change will be retuned to you. On success payment the product number inventory and coins invetory is updated successfully.

### Product Maintainance

For maintainance button you will see a page where maintainace team uses to add products and update products. A product has name of the product, the number stock, the price of the product and the currency/coins representing the price unit of the product.

### Coin maintainance

Coin maintainance where you can update the coins available.

## Available URLs

- path('products/view', ProductsViewSets.as_view({'get': 'list'}), name='products-view'),
- path('products/create', ProductsViewSets.as_view({'post': 'create'}), name='products-create'),
- path('products/update', ProductsViewSets.as_view({'put': 'update'}), name='products-update'),
- path('products/buy', ProductsViewSets.as_view({'post': 'buy'}), name='products-buy'),
- path('coins/view', CoinsViewSets.as_view({'get': 'list'}), name='coins-view'),
- path('coins/update', CoinsViewSets.as_view({'put': 'update'}), name='coins-update'),

### path('products/buy', ProductsViewSets.as_view({'post': 'buy'}), name='products-buy')

This url is where all the buying, update of inventory and giving back the change is handled. The code is well commented for easy navigation.
