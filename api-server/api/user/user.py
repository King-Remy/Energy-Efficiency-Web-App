from datetime import datetime, timezone, timedelta

from functools import wraps

from flask import request
from flask_restx import Api, Resource, fields

import jwt

from api.user.models import db, Users, JWTTokenBlocklist
from api.config import Config
from api.auth.auth import auth_required

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

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        existing_user = Users.get_by_email(email)
        if existing_user:
            return {"success": False,
                    "msg": "Email already taken"}, 400

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

        user = Users.get_by_email(email)

        if not user:
            return {"success": False,
                    "msg": "This email does not exist."}, 400

        if not user.check_password(password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400

        # Generate JWT token
        access_token = jwt.encode(
            {'email': email, 'exp': datetime.utcnow() + timedelta(minutes=30)},
            Config.SECRET_KEY
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

        new_username = data.get("username")
        new_email = data.get("email")

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