from datetime import datetime, timezone, timedelta

from functools import wraps

from flask import request
from flask_restx import Api, Resource, fields

import re
import jwt

from api.user.models import db, Users, JWTTokenBlocklist
from api.config import Config
from api.auth.auth import auth_required
from api.validator import validate_and_sanitize_input

user_rest_api = Api(title="Users API", version="1.0")

"""
    API models for request and response data using Flask-Restx
"""

registration_model = user_rest_api.model(
    'RegistrationModel', {
        "username": fields.String(required=True, min_length=2, max_length=32),
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16)
    }
)

signin_model = user_rest_api.model(
    'SigninModel', {
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16)
    }
)

profile_update_model = user_rest_api.model(
    'ProfileUpdateModel', {
        "userID": fields.String(required=True, min_length=1, max_length=32),
        "username": fields.String(required=True, min_length=2, max_length=32),
        "email": fields.String(required=True, min_length=4, max_length=64)
    }
)

"""
    API Endpoints
"""

@user_rest_api.route('/api/users/register')
class UserRegistration(Resource):
    """
       Creates a new user account
    """

    @user_rest_api.expect(registration_model, validate=True)
    def post(self):
        data = request.get_json()

        # Sanitize and validate inputs
        username, error = validate_and_sanitize_input(data.get("username"), "username")
        if error:
            return {"message": error}, 400
            
        email, error = validate_and_sanitize_input(data.get("email"), "email")
        if error:
            return {"message": error}, 400
            
        password, error = validate_and_sanitize_input(data.get("password"), "password")
        if error:
            return {"message": error}, 400

        # Check if user already exists
        existing_user = Users.get_by_email(email)
        if existing_user:
            return {"success": False,
                    "msg": "This user already exists"}, 400

        user = Users(username=username, email=email)
        user.set_password(password)
        user.save()

        return {"success": True,
                "userID": user.id,
                "msg": "The user was successfully registered"}, 200

@user_rest_api.route('/api/users/login')
class UserAuthentication(Resource):
    """
       Authenticates user and provides JWT token
    """

    @user_rest_api.expect(signin_model, validate=True)
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        # Sanitize and validate inputs
        email, error = validate_and_sanitize_input(data.get("email"), "email")
        if error:
            return {"success": False,
                    "msg": error}, 400

        password, error = validate_and_sanitize_input(data.get("password"), "password")
        if error:
            return {"success": False,
                    "msg": error}, 400

        user = Users.get_by_email(email)

        if not user:
            return {"success": False,
                    "msg": "Invalid credentials"}, 400

        if not user.check_password(password):
            return {"success": False,
                    "msg": "Invalid credentials."}, 400

        # Generate JWT token
        access_token = jwt.encode(
            {'email': email, 'exp': datetime.utcnow() + Config.JWT_ACCESS_TOKEN_EXPIRES},
            Config.JWT_SECRET_KEY
        )

        user.set_jwt_auth_active(True)
        user.save()

        return {"success": True,
                "token": access_token,
                "user": user.toJSON()}, 200

@user_rest_api.route('/api/users/edit')
class UserProfileUpdate(Resource):
    """
       Updates user profile information
    """

    @user_rest_api.expect(profile_update_model)
    @auth_required
    def post(self, current_user):
        data = request.get_json()

        # Sanitize and validate new username if provided
        new_username = None
        if data.get("username"):
            new_username, error = validate_and_sanitize_input(data.get("username"), "username")
            if error:
                return {"success": False,
                        "msg": error}, 400

        # Sanitize and validate new email if provided
        new_email = None
        if data.get("email"):
            new_email, error = validate_and_sanitize_input(data.get("email"), "email")
            if error:
                return {"success": False,
                        "msg": error}, 400

        # Check if email already exists (if changing email)
        if new_email and new_email != current_user.email:
            existing_user = Users.get_by_email(new_email)
            if existing_user:
                return {"success": False,
                        "msg": "Email already exists"}, 400
        
        # Update user fields
        if new_username:
            self.update_username(new_username)

        if new_email:
            self.update_email(new_email)

        self.save()

        return {"success": True}, 200

@user_rest_api.route('/api/users/logout')
class UserLogout(Resource):
    """
       Logs out user and invalidates token
    """

    @auth_required
    def post(self, current_user):
        token = request.headers["authorization"]

        blacklist_entry = JWTTokenBlocklist(
            jwt_token=token,
            created_at=datetime.now(timezone.utc)
        )
        blacklist_entry.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200
    
@user_rest_api.route('/api/users/me')
class UserMe(Resource):
    """
       Provides details of currently authenticated user
    """
    
    @auth_required
    def get(self, current_user):
        return {"success": True,
                "user": current_user.toJSON()}, 200
