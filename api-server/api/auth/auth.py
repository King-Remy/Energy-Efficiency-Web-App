import jwt
from flask import request

from functools import wraps

from api.config import Config
from api.user.models import db, Users, JWTTokenBlocklist

"""
    API models for request and response data using Flask-Restx
"""

def auth_required(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(payload["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return func(current_user, *args, **kwargs)

    return decorator