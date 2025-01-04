from flask import Flask
from app.routes.routes import setup_routes
from app.db.in_memory_db import InMemoryDBHandler
from app.db.mongo_db import MongoDBHandler
from app.config import Config
from flask_cors import CORS

config = Config()

app = Flask(__name__)

cors = CORS(app)
# To change DB, implement a new DB handler that inherits from AbstractDatabaseHandler and initiate it here 
db_handler = InMemoryDBHandler()
# db_handler = MongoDBHandler(config.get_db_url())

setup_routes(app, db_handler)


if __name__ == '__main__':
    app.run(host=config.get_host(), port=config.get_port())
