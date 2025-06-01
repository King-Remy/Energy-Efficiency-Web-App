# TypeScript-Flask Authentication Dashboard 🔐

A secure, modern authentication dashboard built with TypeScript, Vite, Tailwind CSS, Redux, and shadcn/ui on the frontend, powered by a Flask API backend. This project implements best security practices for web applications and provides a solid foundation for building secure web applications.

![Dashboard Preview](/assets/authentication.gif)

## 📋 Project Description

TypeScript-Flask Authentication Dashboard is a full-stack application designed with security in mind. It provides a robust authentication system with JWT tokens, protected routes, and role-based access control. The application follows modern development practices and security principles to ensure a safe and reliable user experience.

### 🛡️ Security Measures

#### Backend Security
- **🔒 JWT Authentication**: Secure token-based authentication with proper expiration handling
- **🔑 Password Hashing**: Werkzeug for secure password storage with salt
- **✅ Input Validation**: Server-side validation with regex patterns for email, username, and password
- **🧹 Input Sanitization**: Comprehensive server-side input sanitization using bleach and regex
- **🔐 Security Headers**: Content Security Policy, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, and HSTS
- **🌐 CORS Protection**: Properly configured Cross-Origin Resource Sharing with credential support
- **⚠️ Generic Error Messages**: Prevents user enumeration attacks
- **🔑 Strong Password Policy**: Enforces password complexity requirements (8+ chars, uppercase, lowercase, numbers, special characters)
- **🚦 Rate Limiting**: Flask-Limiter implementation with stricter limits on authentication endpoints (5 requests/minute)
- **🚫 Token Blacklisting**: JWT token revocation system for secure logout
- **🔒 Environment-based Configuration**: Separate development and production configurations

#### Frontend Security
- **🔑 Token Management**: Secure handling of authentication tokens with universal-cookie
- **🚫 Route Protection**: AuthGuard and GuestGuard components to prevent unauthorized access
- **✅ Form Validation**: Client-side validation with react-hook-form for immediate feedback
- **🧹 Input Sanitization**: Client-side input sanitization utilities for XSS prevention
- **🔒 Secure API Calls**: Axios interceptors for automatic token injection
- **⏱️ Session Management**: Automatic logout on token expiration with JWT context provider
- **🛡️ Type Safety**: Full TypeScript support for improved code quality and security
- **🔒 Content Security Policy**: Production-ready CSP headers for XSS protection
- **🔄 Token Verification**: JWT decode for client-side token validation

## 💻 Running the Client (Frontend)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TypeScript-Flask-Authentication/client
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. The application will be available at `http://localhost:5173`

![Login Screen](/assets/login.png)

### Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory, ready to be deployed.

## 🖥️ Running the API Server (Backend)

### Prerequisites
- Python 3.8 or higher
- pip
- virtualenv (recommended)

### Installation

1. Navigate to the backend directory:
```bash
cd TypeScript-Flask-Authentication/api-server
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
export FLASK_APP=run.py
export FLASK_ENV=development
# On Windows:
# set FLASK_APP=run.py
# set FLASK_ENV=development
```

5. Initialize the database:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

6. Start the Flask server:
```bash
flask run
```

7. The API will be available at `http://localhost:5000`

![Backend Running](/assets/register.png)

## 🔌 API Endpoints

The backend provides the following RESTful API endpoints:

### Authentication

#### 📝 Register
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "example",
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response**: Returns user data and authentication tokens

#### 🔑 Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response**: Returns user data and authentication tokens

#### 👤 Get Current User
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns current user data

#### 🚪 Logout
- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Confirms successful logout

### User Management

#### 📝 Update User Profile
- **URL**: `/api/user/update`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "userID": "1",
    "username": "newusername",
    "email": "newemail@example.com"
  }
  ```
- **Response**: Returns updated user data

## 📁 Project Structure

```
typescript-flask-auth/
├── api-server/                 # Flask API server
│   ├── api/
│   │   ├── __init__.py        # Flask app initialization with CORS and rate limiting
│   │   ├── auth/              # Authentication decorators and middleware
│   │   │   └── auth.py        # JWT authentication decorator
│   │   ├── user/              # User management
│   │   │   ├── models.py      # User and JWT blacklist models
│   │   │   └── user.py        # User API endpoints
│   │   ├── config.py          # Environment-based configuration
│   │   └── validator.py       # Input validation and sanitization utilities
│   ├── migrations/            # Database migration files
│   ├── requirements.txt       # Python dependencies
│   ├── run.py                 # Entry point
│   ├── Dockerfile             # Docker configuration
│   └── gunicorn-cfg.py        # Production server configuration
│
└── client/                    # Vite + TypeScript frontend
    ├── src/
    │   ├── components/        # Reusable UI components
    │   │   └── ui/            # shadcn/ui components with custom modifications
    │   ├── contexts/          # React contexts
    │   │   ├── JWTContext.tsx # JWT authentication context provider
    │   │   └── auth-form-context.ts # Form validation context
    │   ├── hooks/             # Custom React hooks
    │   │   ├── useAuth.ts     # Authentication hook
    │   │   └── use-toast.ts   # Toast notification hook
    │   ├── layout/            # Layout components
    │   │   ├── MainLayout/    # Authenticated user layout with sidebar
    │   │   └── MinimalLayout/ # Authentication pages layout
    │   ├── menu-items/        # Navigation menu configuration
    │   ├── routes/            # Route configuration and guards
    │   ├── store/             # Redux store and slices
    │   ├── types/             # TypeScript type definitions
    │   ├── utils/             # Utility functions
    │   │   ├── routeGuards.tsx # Route protection components
    │   │   └── sanitization.tsx # Input sanitization utilities
    │   ├── views/             # Page components
    │   │   ├── authentication/ # Login and registration forms
    │   │   ├── dashboard/     # Dashboard pages
    │   │   └── profile/       # User profile pages
    │   ├── api/               # API configuration
    │   │   └── axios.ts       # Axios instance with interceptors
    │   ├── App.tsx            # Main app component
    │   └── main.tsx           # Entry point
    ├── public/                # Static assets and security headers
    │   ├── _headers           # Security headers configuration
    │   ├── _headers.prod      # Production security headers
    │   └── _header.dev        # Development security headers
    ├── package.json           # Node.js dependencies
    ├── vite.config.ts         # Vite configuration with security headers
    ├── tailwind.config.js     # Tailwind CSS configuration
    ├── components.json        # shadcn/ui configuration
    └── Dockerfile             # Docker configuration
```

## ✨ Features

### 🔐 Backend Features
- **🔒 JWT Authentication**: Secure token-based authentication with proper expiration handling
- **🔑 Password Hashing**: Werkzeug for secure password storage with salt
- **✅ Input Validation**: Server-side validation with regex patterns for email, username, and password
- **🧹 Input Sanitization**: Comprehensive server-side input sanitization using bleach and regex
- **🔐 Security Headers**: Content Security Policy, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, and HSTS
- **🌐 CORS Protection**: Properly configured Cross-Origin Resource Sharing with credential support
- **⚠️ Generic Error Messages**: Prevents user enumeration attacks
- **🔑 Strong Password Policy**: Enforces password complexity requirements
- **🚦 Rate Limiting**: Flask-Limiter implementation with stricter limits on authentication endpoints
- **🚫 Token Blacklisting**: JWT token revocation system for secure logout
- **🔒 Environment-based Configuration**: Separate development and production configurations
- **📊 Database Management**: Flask-Migrate for database schema management
- **🔧 RESTful API**: Well-structured API endpoints for user management

### 🎨 Frontend Features
- **🎨 Modern UI**: Clean, responsive interface built with Tailwind CSS and shadcn/ui
- **📱 Responsive Design**: Mobile-first approach with responsive layouts
- **🌙 Sidebar Navigation**: Collapsible sidebar with menu items
- **🍞 Toast Notifications**: User feedback with toast messages
- **⚡ Loading States**: Proper loading indicators and skeleton screens
- **🎭 Animations**: Smooth transitions with Framer Motion
- **🛡️ Type Safety**: Full TypeScript support for better code quality
- **🔄 State Management**: Redux toolkit for predictable state management
- **📡 API Integration**: Axios with interceptors for API communication
- **🎣 Custom Hooks**: Reusable authentication and UI hooks
- **🏗️ Component Architecture**: Modular component structure with context providers
- **🔑 Token Management**: Secure handling of authentication tokens with universal-cookie
- **🚫 Route Protection**: AuthGuard and GuestGuard components to prevent unauthorized access
- **✅ Form Validation**: Client-side validation with react-hook-form for immediate feedback
- **🧹 Input Sanitization**: Client-side input sanitization utilities for XSS prevention
- **🔒 Secure API Calls**: Axios interceptors for automatic token injection
- **⏱️ Session Management**: Automatic logout on token expiration with JWT context provider
- **🔒 Content Security Policy**: Production-ready CSP headers for XSS protection
- **🔄 Token Verification**: JWT decode for client-side token validation

### 📊 Dashboard Features
- **📊 Dashboard Overview**: Welcome cards with security status and activity
- **👤 User Profile**: Profile viewing and editing capabilities
- **🔐 Session Management**: Active session tracking and management
- **📱 Mobile-Friendly**: Responsive design for all device sizes

## 🆕 Recently Added Features

### ✅ Security Enhancements - Backend
- **🛡️ Security Headers**: Implemented robust HTTP security headers (CSP, X-Content-Type-Options, X-Frame-Options, HSTS)
- **🧹 Input Validation**: Comprehensive server-side input validation with regex patterns
- **🧹 Input Sanitization**: Server-side input sanitization using bleach library
- **🚦 Rate Limiting**: Flask-Limiter with stricter limits on authentication endpoints

### ✅ Security Enhancements - Frontend
- **🔒 Content Security Policy (CSP)**: Implemented CSP headers to prevent XSS attacks
- **🧹 Input Sanitization**: Client-side input sanitization before API calls
- **🔍 Security Headers**: Environment-specific security header configurations

### ✅ Authentication Enhancements
- **🔑 Token Blacklisting**: JWT token revocation system for secure logout
- **⏱️ Session Management**: Automatic token validation and expiration handling
- **🔐 Password Validation**: Strong password policy enforcement

### ✅ User Management
- **👥 User Profile Management**: Profile viewing and basic editing capabilities
- **🎨 Dashboard Interface**: Modern dashboard with user information cards

### ✅ Infrastructure
- **🐳 Docker Support**: Docker configurations for both frontend and backend
- **🔧 Environment Configuration**: Separate development and production configurations
- **📊 Database Migrations**: Flask-Migrate for database schema management

## 🚀 Upcoming Features

### Authentication Enhancements
- **🔐 OAuth 2.0 Integration**: Social login with Google, GitHub, and Microsoft
- **🔄 Password Reset Flow**: Complete self-service password recovery with email verification
- **📧 Email Verification**: Account verification via email
- **🔄 Token Refresh**: Automatic JWT token refresh mechanism
- **📱 Two-Factor Authentication (2FA)**: SMS and app-based 2FA support
- **🔐 Account Lockout**: Temporary account lockouts after failed login attempts

### User Management
- **🖼️ Avatar Uploads**: Profile picture management with image optimization
- **👮 Admin Dashboard**: User management interface for administrators
- **📋 User Roles**: Advanced role-based access control system
- **📊 User Analytics**: User activity tracking and analytics
- **🔍 User Search**: Advanced user search and filtering capabilities
- **📝 Activity Logs**: Comprehensive user activity logging

### Security Enhancements
- **🔍 Security Headers Verification**: Client-side verification of security headers
- **🛡️ Advanced Threat Protection**: IP-based blocking and threat detection
- **📊 Security Monitoring**: Real-time security event monitoring
- **🔐 Session Security**: Enhanced session management with device tracking
- **🧪 Security Testing**: Automated security vulnerability scanning

### Infrastructure & DevOps
- **🚀 Production Readiness**: Optimize configuration for production deployment
- **🐳 Docker Compose**: Simplified deployment with Docker Compose
- **☁️ CI/CD Pipeline**: Automated testing and deployment workflows

### Developer Experience
- **📚 API Documentation**: Interactive Swagger/OpenAPI documentation
- **🧪 Test Coverage**: Comprehensive unit and integration tests
- **🧪 E2E Testing**: End-to-end testing with Playwright or Cypress

