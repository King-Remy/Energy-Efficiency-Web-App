import re
import html
import bleach

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_username(username):
    """Validate username format and requirements"""
    if len(username) < 2 or len(username) > 32:
        return False

    # Allow alphanumeric characters, dots and underscores
    if not re.match(r'^[a-zA-Z0-9._]+$', username):
        return False
    
    # Must start with a letter
    if not username[0].isalpha():
        return False
    
    return True


def validate_password(password):
    """Validate password strength"""
    if len(password) < 0:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'[0-9]', password):
        return False
    if not re.search(r'[^A-za-z0-9]', password):
        return False
    
    return True
    
def sanitize_input(input_string, allowed_tags=None):
    """
    Sanitize username input (more lenient for usernames)
    """
    if not input_string:
        return ""
    
    if allowed_tags is None:
        allowed_tags = []  # No HTML tags allowed by default
    
    # Use bleach to clean HTML
    sanitized = bleach.clean(
        input_string,
        tags=allowed_tags,
        attributes={},
        strip=True
    )
    
    return sanitized.strip()

def sanitize_username(username):
    """
    Sanitize username input (more lenient for usernames)
    """
    if not username:
        return ""
    
    # Remove HTML tags but keep alphanumeric, dots, underscores
    sanitized = re.sub(r'[^a-zA-Z0-9._]', '', str(username))
    
    return sanitized.strip()

def sanitize_email(email):
    """
    Sanitize email input
    """
    if not email:
        return ""
    
    # Remove HTML tags and dangerous characters, keep email-valid chars
    sanitized = re.sub(r'[^a-zA-Z0-9._%+-@]', '', str(email))
    
    return sanitized.strip().lower()

def validate_and_sanitize_input(input_string, input_type="general"):
    """
    Combined validation and sanitization based on input type
    """
    if not input_string:
        return None, "Input cannot be empty"
    
    # Sanitize based on type
    if input_type == "username":
        sanitized = sanitize_username(input_string)
        if not validate_username(sanitized):
            return None, "Invalid username format"
    elif input_type == "email":
        sanitized = sanitize_email(input_string)
        if not validate_email(sanitized):
            return None, "Invalid email format"
    elif input_type == "password":
        # Don't sanitize passwords too aggressively, just basic checks
        sanitized = str(input_string).strip()
        if not validate_password(sanitized):
            return None, "Password does not meet requirements"
    else:
        sanitized = sanitize_input(input_string)
    
    return sanitized, None