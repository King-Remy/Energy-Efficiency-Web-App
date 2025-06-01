# config.py
import os
import os, random, string
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', None)
    if not SECRET_KEY:
        SECRET_KEY = ''.join(random.choice( string.ascii_lowercase  ) for i in range( 32 ))
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', None)
    if not JWT_SECRET_KEY:
        JWT_SECRET_KEY = ''.join(random.choice( string.ascii_lowercase  ) for i in range( 32 ))

    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db.sqlite3')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_COOKIE_SECURE = os.environ.get('FLASK_ENV') == 'production'
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_COOKIE_SAMESITE = 'Strict'

class DevelopmentConfig(Config):
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4  # Lower for faster tests

class ProductionConfig(Config):
    # Production-specific settings
    DEBUG = True