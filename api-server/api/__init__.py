import os, json
from flask import Flask
from flask_cors import CORS

from api.user.models import db
from api.user.user import user_rest_api
from api.config import Config

app = Flask(__name__)

app.config.from_object('api.config.Config')

db.init_app(app)
user_rest_api.init_app(app)

CORS(app)

# Setup database
@app.before_first_request
def initialize_database():
    try:
        db.create_all()
    except Exception as e:

        print('> Error: DBMS Exception: ' + str(e) )

        # fallback to SQLite
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3')

        print('> Fallback to SQLite ')
        db.create_all()