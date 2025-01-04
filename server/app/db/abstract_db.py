from abc import ABC, abstractmethod
from typing import List, Dict
from app.models.product import Product

class AbstractDatabaseHandler(ABC):
    @abstractmethod
    def get_categories(self) -> List[Product]:
        pass

    @abstractmethod
    def get_products(self, category: str, page_size: int, page: int) -> List[str]:
        pass

    @abstractmethod
    def save_cart(self, shopping_cart: Dict, user_id: str):
        pass
    
    @abstractmethod
    def get_cart(self, user_id: str):
        pass
