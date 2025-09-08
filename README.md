# IIC Multi-Agent RAG System

An intelligent HR assistant system powered by multi-agent architecture using FastAPI backend and Next.js frontend.

## 🏗️ **Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   FastAPI       │    │   SQLite/       │
│   Frontend      │────│   Backend       │────│   PostgreSQL    │
│                 │    │                 │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
    ┌───────┐              ┌───────┐              ┌───────┐
    │ Auth  │              │ JWT   │              │ User  │
    │ UI    │              │ Auth  │              │ Data  │
    │ RBAC  │              │ RBAC  │              │ RBAC  │
    └───────┘              └───────┘              └───────┘
```

## 🚀 **Features**

### ✅ **Implemented:**
- **Role-Based Authentication** (Employee, Manager, HR, Admin)
- **JWT Token Authentication** with secure password hashing
- **Admin-only User Management** (Create, Update, Delete users)
- **Modern UI** with responsive design
- **Real-time Chat Interface** with role-based responses
- **Admin Panel** for user management
- **Offline-first Architecture** (SQLite support)

### 🔄 **In Progress:**
- **Vector Database Integration** for AI responses
- **Local AI Model Integration** (Offline LLM)
- **Organizational Data Import** features

## 📁 **Project Structure**

```
IIC/
├── server/              # FastAPI Backend
│   ├── app/
│   │   ├── core/        # Auth, config, database
│   │   ├── models/      # SQLAlchemy models  
│   │   ├── routes/      # API endpoints
│   │   └── schemas/     # Pydantic schemas
│   ├── alembic/         # Database migrations
│   ├── main.py          # FastAPI app
│   └── init_db.py       # Database setup
└── client/              # Next.js Frontend
    ├── app/             # Next.js app router
    ├── components/      # React components
    ├── lib/             # API client & auth
    └── public/          # Static assets
```

## 🔧 **Quick Setup**

### **Backend (FastAPI)**
```bash
cd server
uv sync                    # Install dependencies
uv run python init_db.py   # Initialize database
uv run python main.py      # Start server (localhost:8000)
```

### **Frontend (Next.js)**
```bash
cd client
pnpm install              # Install dependencies  
pnpm dev                  # Start development (localhost:3000)
```

## 👥 **Default User Accounts**

| Role | Username | Password | Access Level |
|------|----------|----------|-------------|
| **Admin** | `admin` | `admin123` | Full system access |
| **HR** | `hr_manager` | `hr123` | View all users |
| **Manager** | `team_manager` | `manager123` | Team management |
| **Employee** | `employee1` | `emp123` | Basic access |

## 🔐 **Authentication Flow**

1. **User logs in** via frontend with username/password
2. **Backend validates** credentials against database
3. **JWT token issued** with user role information
4. **Frontend stores** token and user data
5. **Role-based access** enforced on all routes
6. **Token validation** on each API request

## 🎯 **Role-Based Access Control**

### **Admin Role:**
- Create, update, delete users
- Full access to admin panel
- System configuration
- View all organizational data

### **HR Role:**
- View all employee information
- Access HR-specific features
- Employee management queries

### **Manager Role:**
- Access team information
- Team performance data
- Manager-specific queries

### **Employee Role:**
- View own profile
- Basic organizational queries
- Standard chat interface

## 🌐 **API Endpoints**

### **Authentication:**
- `POST /auth/login` - User login
- `GET /users/me` - Current user profile

### **User Management (Admin Only):**
- `POST /users/` - Create user
- `GET /users/` - List users (HR+)
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Deactivate user

### **Health Check:**
- `GET /health` - System health
- `GET /docs` - API documentation

## 🗄️ **Database Schema**

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role ENUM('employee','manager','hr','admin') DEFAULT 'employee',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🛡️ **Security Features**

- **bcrypt Password Hashing** for secure storage
- **JWT Token Authentication** with expiration
- **Role-based Route Protection** 
- **CORS Configuration** for frontend integration
- **Environment Variable Configuration**
- **SQL Injection Prevention** via SQLAlchemy ORM

## 🚀 **Deployment**

### **Development:**
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`
- Database: SQLite (local file)

### **Production Ready:**
- Switch to PostgreSQL for production
- Environment-based configuration
- Docker containerization support
- Nginx reverse proxy configuration

## 📚 **Technology Stack**

### **Backend:**
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Alembic** - Database migrations
- **Passlib** - Password hashing
- **python-jose** - JWT token handling
- **Pydantic** - Data validation

### **Frontend:**
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **React Hook Form** - Form handling

### **Database:**
- **SQLite** (Development)
- **PostgreSQL** (Production ready)

## 🎨 **UI Features**

- **Responsive Design** for all screen sizes
- **Dark/Light Mode** support
- **Loading States** and error handling
- **Toast Notifications** for user feedback
- **Modern Component Library** (Radix UI)
- **Accessible Design** patterns

## 🔍 **Testing the System**

1. **Start both servers** (backend + frontend)
2. **Navigate to** `http://localhost:3000`
3. **Login with demo credentials**
4. **Test role-based access:**
   - Admin: Access `/admin` panel
   - Others: Access `/chat` interface
5. **Try user management** (admin only)
6. **Test authentication** flow

## 📖 **Next Development Steps**

1. **AI Integration:**
   - Vector database setup (ChromaDB/Pinecone)
   - Local LLM integration (Ollama/Llama)
   - Document processing pipeline

2. **Enhanced Features:**
   - File upload for organizational data
   - Advanced search capabilities
   - Analytics and reporting

3. **Performance:**
   - Caching layer (Redis)
   - Database optimization
   - CDN for static assets

## 🏆 **Problem Statement Compliance**

This solution addresses the IIC hackathon requirements:

✅ **Working Authentication System** with RBAC
✅ **Offline-capable Architecture** (SQLite + local AI ready)
✅ **Modern Web Interface** for chatbot interactions
✅ **Role-based Access Control** (Employee, Manager, HR, Admin)
✅ **Security Implementation** (JWT, password hashing)
✅ **Documentation & Setup** (README, scripts)
✅ **Scalable Architecture** (FastAPI + Next.js)

---

**Built by:** IIC Two Men Squad  
**Repository:** [IIC_Two_Men_Squad](https://github.com/SiddharthShukla48/IIC_Two_Men_Squad)  
**Tech Stack:** FastAPI + Next.js + TypeScript + PostgreSQL/SQLite
