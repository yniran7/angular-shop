from pymongo import MongoClient
from .abstract_db import AbstractDatabaseHandler
from typing import Dict

class MongoDBHandler(AbstractDatabaseHandler):
    client: MongoClient
    
    def __init__(self, db_url: str):
        self.client = MongoClient(db_url)
        self.db = self.client["store"]
        self.products = self.db["products"]
        self.carts = self.db["carts"]
    
    def get_categories(self):
        return self.products.distinct('category')

    def get_products(self, category: str, page_size: int, page: int):
        return list(self.products.find({"category": category}).skip(page_size * (page - 1)).limit(page_size))

    def save_cart(self, shopping_cart: Dict, user_id: str):
        self.carts.replace_one({"_id": user_id}, {"_id": user_id, "products": shopping_cart}, upsert=True)
    
    def get_cart(self, user_id: str):
        return self.carts.find_one({"_id": user_id})
