# TypeScript-Flask Authentication Dashboard 🔐

A secure, modern authentication dashboard built with TypeScript, Vite, Tailwind CSS, Redux, and shadcn/ui on the frontend, powered by a Flask API backend. This project implements best security practices for web applications and provides a solid foundation for building secure web applications.

![Dashboard Preview](/assets/authentication.gif)

## 📋 Project Description

TypeScript-Flask Authentication Dashboard is a full-stack application designed with security in mind. It provides a robust authentication system with JWT tokens, protected routes, and role-based access control. The application follows modern development practices and security principles to ensure a safe and reliable user experience.

### 🛡️ Security Measures

#### Backend Security
- **🔒 JWT Authentication**: Secure token-based authentication with proper expiration handling
- **🔑 Password Hashing**: bcrypt for secure password storage with salt
- **✅ Input Validation**: Server-side validation with regex patterns for email and password
- **🔐 Security Headers**: Content Security Policy, X-Content-Type-Options, X-Frame-Options, and HSTS
- **🌐 CORS Protection**: Properly configured Cross-Origin Resource Sharing
- **⚠️ Generic Error Messages**: Prevents user enumeration attacks
- **🔑 Strong Password Policy**: Enforces password complexity requirements

#### Frontend Security
- **🔑 Token Management**: Secure handling of authentication tokens
- **🚫 Route Protection**: Guards to prevent unauthorized access to protected routes
- **✅ Form Validation**: Client-side validation for immediate feedback
- **🔒 Secure API Calls**: Proper handling of authentication headers
- **⏱️ Session Management**: Automatic logout on token expiration
- **🛡️ Type Safety**: TypeScript for improved code quality and security

## 💻 Running the Client (Frontend)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Energy-Efficiency-App/client
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
cd Energy-Efficiency-App/api-server
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

5. Start the Flask server:
```bash
flask run
```

6. The API will be available at `http://localhost:5000`

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

## 📁 Project Structure

```
typescript-flask-auth/
├── api-server/                 # Flask API server
│   ├── api/
│   │   ├── __init__.py      # Flask app initialization
│   │   ├── auth/          # API models for request and response data using Flask-Restx
│   │   ├── user/          # API endpoints and Database schema
│   │   ├── config.py        # Configuration
│   │ 
│   ├── requirements.txt     # Python dependencies
│   └── run.py               # Entry point
│
└── client/                # Vite + TypeScript frontend
    ├── src/
    │   ├── components/      # UI components
    │   ├── layouts/         # Layout components
    │   ├── pages/           # Page components
    │   ├── store/           # Redux store
    |   ├── hooks/           # autheincation functions
    │   ├── utils/           # Utility functions
    |   ├── views/           # authentication components
    │   ├── App.tsx          # Main app component
    │   └── main.tsx         # Entry point
    ├── public/              # Static assets
    ├── package.json         # Node.js dependencies
    └── vite.config.ts       # Vite configuration
```

## ✨ Features

- **🔒 Secure Authentication**: JWT-based authentication with proper token management
- **👥 Role-Based Access Control**: Different access levels for different user roles
- **🎨 Modern UI**: Clean, responsive interface built with Tailwind CSS and shadcn/ui
- **🛡️ Type Safety**: Full TypeScript support for better code quality
- **🔄 State Management**: Redux for predictable state management
- **🚫 Protected Routes**: Secure routing with authentication guards
- **✅ Form Validation**: Client and server-side validation for data integrity
- **⚠️ Error Handling**: Proper error handling and user feedback

## 🚀 Upcoming Features

The TypeScript-Flask Authentication Dashboard roadmap includes these planned enhancements:

### Security Enhancements - Backend
- **🛡️ Security Headers**: Implement robust HTTP security headers (Content Security Policy, X-Content-Type-Options, X-Frame-Options, etc.)
- **🧹 Input Sanitization**: Add comprehensive server-side input sanitization and validation
- **📊 Failed Login Tracking**: Implement rate limiting and temporary account lockouts

### Security Enhancements - Frontend
- **🔒 Content Security Policy (CSP)**: Implement CSP to prevent XSS attacks
- **🔄 Token Refresh**: Add automatic JWT token refresh mechanism
- **🧹 Input Sanitization**: Implement client-side input sanitization before API calls
- **🔍 Security Headers Verification**: Client-side verification of security headers

### Authentication Enhancements
- **🔐 OAuth 2.0 Integration**: Social login with Google, GitHub, and Microsoft

### User Management
- **👥 User Profile Management**: Self-service profile updates and avatar uploads
- **🔄 Password Reset Flow**: Complete self-service password recovery
- **👮 Admin Dashboard**: User management interface for administrators

### Infrastructure
- **🚀 Production Readiness**: Optimize configuration for production deployment
- **🐳 Docker Containerization**: Simplified deployment with Docker Compose
- **☁️ CI/CD Pipeline**: Automated testing and deployment workflows
- **📈 Performance Monitoring**: Integration with monitoring tools

### Developer Experience
- **📚 API Documentation**: Interactive Swagger/OpenAPI documentation
- **🧪 Expanded Test Coverage**: E2E testing
