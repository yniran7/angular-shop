from flask import Flask, request, jsonify
from app.db.abstract_db import AbstractDatabaseHandler

def setup_routes(app: Flask, db_handler: AbstractDatabaseHandler):
    
    @app.route('/products/categories', methods=['GET'])
    def get_product_categories():
        categories = db_handler.get_categories()
        return jsonify({"categories": categories}), 200

    @app.route('/products/category', methods=['GET'])
    def get_products_for_category():
        category = request.args.get('category')
        page_size = int(request.args.get('pageSize', 20))
        page = int(request.args.get('page', 1))

        products = db_handler.get_products(category, page_size, page)
        return jsonify({"products": products}), 200

    @app.route('/shopping-cart', methods=['POST'])
    def save_shopping_cart():
        shopping_cart = request.get_json()
        
        user_id = request.args.get('user_id')
        if not shopping_cart or not user_id:
            return jsonify({"error": "Invalid input"}), 400

        db_handler.save_cart(shopping_cart, user_id)
        return jsonify({"message": "Shopping cart saved successfully."}), 201
    
    @app.route('/shopping-cart', methods=['GET'])
    def get_shopping_cart():
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"error": "Invalid input"}), 400

        return db_handler.get_cart(user_id), 200
