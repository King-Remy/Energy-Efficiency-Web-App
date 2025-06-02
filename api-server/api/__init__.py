import os, json
from flask import Flask, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


from api.user.models import db
from api.user.user import user_rest_api
from api.config import Config
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('api.config.Config')

# Initialize the app with database and user API
db.init_app(app)
user_rest_api.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app,db)

# Initialize rate limiter
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"  # Use memory storage for development
)

# CORS setup
origins = app.config.get('CORS_ORIGINS', 'http://localhost:5173')
CORS(app,
    resources={r"/api/*": {"origins": origins.split(','), "supports_credentials": True}},
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    expose_headers=["Content-Type"])

# Add security headers to all responses
@app.after_request
def add_security_headers(response):
    # response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['X-Frame-Options'] = 'DENY'
    if app.config.get('ENV') == 'production':
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

# Apply stricter rate limiting to authentication endpoints
@app.before_request
def limit_auth_routes():
    if request.endpoint and any(endpoint in request.endpoint for endpoint in ['login', 'register', 'auth']):
        # Apply 5 requests per minute for auth endpoints
        try:
            limiter.limit("5 per minute")(lambda: None)()
        except Exception:
            pass  # Let the limiter handle the response


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