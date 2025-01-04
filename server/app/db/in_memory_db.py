import os.path
from typing import List, Dict
from .abstract_db import AbstractDatabaseHandler
import json

db_file = './db.json'

class InMemoryDBHandler(AbstractDatabaseHandler):
    def __init__(self):
        self._init_db()

    def _init_db(self):
        if os.path.exists(db_file):
            with open(db_file, 'r') as file:
                db = json.load(file)
                self.products = db['products']
                self.shopping_cart = db['shopping_cart']
        else:
            self.products = {
                "fruits": [
                    {"name": "apple", "price": 5},
                    {"name": "banana", "price": 7},
                    {"name": "orange", "price": 6},
                ],
                "vegetables": [
                    {"name": "rth", "price": 6},
                    {"name": "asd", "price": 6},
                    {"name": "carrot", "price": 6},
                    {"name": "broccoli", "price": 6},
                    {"name": "spinach", "price": 6}
                    ]
            }
            self.shopping_cart = {}
            self.update_file()
            
    def update_file(self):
        with open(db_file, 'w+') as file:
            json.dump({'products': self.products, 'shopping_cart': self.shopping_cart}, file)

    def get_categories(self) -> List[str]:
        return list(self.products.keys())

    def get_products(self, category: str, page_size: int, page: int) -> List[str]:
        if category not in self.products:
            return []

        products = self.products[category]
        l = (page - 1) * page_size
        r = l + page_size
        return products[l:r]

    def save_cart(self, shopping_cart: Dict, user_id: str):
        self.shopping_cart[user_id] = shopping_cart
        self.update_file()
        
        
    def get_cart(self, user_id: str):
        try:
            return {'products': self.shopping_cart[user_id]}
        except: 
            return {'products': []}