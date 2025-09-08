# IIC Authentication Server

A FastAPI-based authentication server with PostgreSQL database for organizational user management.

## Features

- **Admin-controlled user management**: Only admins can create/delete users
- **Role-based access control**: Employee, Manager, HR, Admin roles
- **JWT authentication**: Secure token-based authentication
- **PostgreSQL database**: Robust database with proper schema
- **Password hashing**: Secure bcrypt password hashing
- **Database migrations**: Alembic for database version control

## User Roles

- **Employee**: Basic user, can only login and view own profile
- **Manager**: Can view own profile and potentially manage team (future feature)
- **HR**: Can view all users and their profiles
- **Admin**: Full access - can create, update, delete users and manage system

## Setup Instructions

### 1. Prerequisites

- Python 3.8+
- PostgreSQL database
- UV package manager (already set up)

### 2. Database Setup

Install and start PostgreSQL, then create the database:

```sql
CREATE DATABASE iic_auth;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE iic_auth TO postgres;
```

### 3. Environment Configuration

The `.env` file is already created with default values. Update it with your actual database credentials:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/iic_auth
SECRET_KEY=your-super-secret-key-change-this-in-production
```

### 4. Install Dependencies

```bash
uv sync
```

### 5. Initialize Database

Run the database initialization script to create tables and default admin user:

```bash
uv run python init_db.py
```

This will create:
- All database tables
- Default admin user (username: `admin`, password: `admin123`)

**⚠️ IMPORTANT**: Change the admin password after first login!

### 6. Run the Server

```bash
uv run python main.py
```

The server will start on `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /auth/login` - Login with username/password
- `GET /docs` - Interactive API documentation

### User Management (Admin only)
- `POST /users/` - Create new user (Admin only)
- `GET /users/` - List all users (HR/Admin only)
- `GET /users/{user_id}` - Get user details (HR/Admin only)
- `PUT /users/{user_id}` - Update user (Admin only)
- `DELETE /users/{user_id}` - Deactivate user (Admin only)

### Profile
- `GET /users/me` - Get current user profile

## Usage Examples

### 1. Admin Login
```bash
curl -X POST "http://localhost:8000/auth/login" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=admin&password=admin123"
```

### 2. Create New User (Admin only)
```bash
curl -X POST "http://localhost:8000/users/" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "username": "john_doe",
       "password": "securepassword",
       "role": "employee",
       "is_active": true
     }'
```

### 3. User Login
```bash
curl -X POST "http://localhost:8000/auth/login" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=john_doe&password=securepassword"
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role ENUM('employee','manager','hr','admin') NOT NULL DEFAULT 'employee',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Role-based Access**: Different permission levels for different roles
- **Soft Delete**: Users are deactivated rather than deleted
- **Environment Variables**: Sensitive configuration in `.env` file

## Development

### Database Migrations

Create a new migration:
```bash
uv run alembic revision --autogenerate -m "description"
```

Apply migrations:
```bash
uv run alembic upgrade head
```

### API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation.

## Production Deployment

1. **Change default credentials**: Update admin password and secret key
2. **Use environment variables**: Set production database URL and secret key
3. **Enable HTTPS**: Use proper SSL certificates
4. **Database security**: Use proper database credentials and network security
5. **CORS configuration**: Update CORS settings for your frontend domain