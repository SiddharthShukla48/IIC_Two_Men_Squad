# AI-Powered Offline Organizational Chatbot (OrgChat)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0+-00a393.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black.svg)](https://nextjs.org/)

## 🚀 Project Overview

**OrgChat** is a fully functional offline AI-powered organizational chatbot designed to handle employee queries by retrieving information from organizational databases. The solution implements role-based access control (RBAC), runs entirely offline using local LLMs, and provides a secure, scalable chatbot interface for organizational data management.

### 🎯 Problem Statement

Organizations generate and store vast amounts of employee information across Administration/HR systems and employee portals. Traditional systems require manual navigation through multiple applications. This AI-driven chatbot simplifies the process by allowing employees, managers, and HR to query data conversationally while ensuring data security, role-based access, and complete offline operation.

## 🏗️ Architecture Overview

```
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│  Frontend (Next.js) │───▶│  Backend (FastAPI)   │───▶│  Vector Database    │
│                     │    │                      │    │    (ChromaDB)       │
│ • Chat Interface    │    │ • Authentication     │    │ • Semantic Search   │ 
│ • Role Management   │    │ • Multi-Agent RAG    │    │ • Document Storage  │
│ • Real-time UI      │    │ • API Endpoints      │    │ • Neural Re-Ranker  │
└─────────────────────┘    └──────────────────────┘    └─────────────────────┘
                                      │
                                      ▼
                           ┌──────────────────────-┐
                           │   Local LLM (Ollama)  │
                           │                       │
                           │ • llama3.2:1b         │
                           │ • Offline Processing  │
                           │ • No Internet Required│
                           └──────────────────────-┘
```

## ✨ Key Features

### 🔐 Role-Based Access Control (RBAC)
- **Employee**: Basic access to personal information and general policies
- **Manager**: Access to team member information and departmental data
- **HR**: Full access to employee records, policies, and organizational data
- **Admin**: Complete system administration capabilities

### 🤖 Multi-Agent RAG System
- **Employee Information Agent**: Handles queries about employee data, departments, and project assignments
- **Policy Agent**: Manages company policies, procedures, and HR guidelines
- **Organizational Agent**: Provides information about company structure and organizational data
- **Query Router**: Intelligently routes queries to appropriate specialized agents

### 🗄️ Data Processing & Vectorization
- **JSON Data Ingestion**: Processes organizational data in JSON format
- **CSV Support**: Handles policy and project data from CSV files
- **PDF Processing**: Extracts and indexes content from policy documents
- **ChromaDB Integration**: Efficient vector database for semantic search
- **Neural Re-Ranker (Cross-Encoder)**: Includes an neural cross-encoder re-ranker that refines retrieval by reordering ChromaDB’s top-K results.

### 🌐 Web Interface
- **Modern UI**: Built with Next.js and Tailwind CSS
- **Real-time Chat**: Responsive chat interface with typing indicators
- **Authentication**: Secure login system with JWT tokens
- **Role Indicators**: Visual indicators showing which agent handled each query

### 🔒 Security & Privacy
- **Offline Operation**: No external API calls or internet dependency
- **Local Data Storage**: All data remains within the organization
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt-based password security

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI 0.104.0+
- **Database**: SQLite (with SQLAlchemy ORM)
- **Vector Database**: ChromaDB 0.5.0+
- **Authentication**: JWT with bcrypt password hashing
- **LLM Framework**: LangChain + CrewAI
- **Local LLM**: Ollama (llama3.2:1b)
- **Package Manager**: UV (ultra-fast Python package manager)

### Frontend
- **Framework**: Next.js 14.2.25
- **UI Components**: Radix UI + Tailwind CSS
- **Type Safety**: TypeScript
- **State Management**: React Hooks + Context API
- **HTTP Client**: Custom API client with authentication

### AI/ML Components
- **Multi-Agent System**: CrewAI 0.177.0+
- **Vector Embeddings**: Ollama embeddings
- **Document Processing**: LangChain document loaders
- **Semantic Search**: ChromaDB vector similarity search
- **Neural Re-Ranker (Cross-Encoder — Offline Neural Network)**: 

## 📁 Project Structure

```
IIC/
├── client/                     # Next.js Frontend
│   ├── app/                    # App Router pages
│   │   ├── page.tsx           # Login page
│   │   ├── chat/              # Chat interface
│   │   └── admin/             # Admin panel
│   ├── components/            # Reusable React components
│   │   ├── chat-interface.tsx # Main chat component
│   │   ├── login-form.tsx     # Authentication form
│   │   ├── auth-guard.tsx     # Route protection
│   │   └── ui/                # UI components
│   ├── lib/                   # Utility functions
│   │   ├── api.ts            # API client
│   │   ├── auth-context.tsx  # Authentication context
│   │   └── utils.ts          # Helper functions
│   └── public/               # Static assets
│
└── server/                    # FastAPI Backend
    ├── app/                   # Application code
    │   ├── core/             # Core functionality
    │   │   ├── auth.py       # Authentication logic
    │   │   ├── config.py     # Configuration settings
    │   │   └── database.py   # Database connection
    │   ├── models/           # Database models
    │   │   ├── user.py       # User model with RBAC
    │   │   └── chat_models.py # Chat data models
    │   ├── routes/           # API endpoints
    │   │   ├── auth.py       # Authentication routes
    │   │   ├── chat_routes.py # Chat API endpoints
    │   │   └── users.py      # User management
    │   ├── rag/              # RAG System
    │   │   ├── simplified_multi_agent_rag.py # Main RAG system
    │   │   ├── rag_chromadb.py              # ChromaDB integration
    │   │   └── multi_agent_rag.py           # Advanced multi-agent system
    │   └── schemas/          # Pydantic models
    ├── RAG_context/          # Organizational data
    │   ├── rag_context_organizational_data.json # Employee data
    │   ├── policies.csv      # Company policies
    │   ├── projects.csv      # Project information
    │   └── *.pdf            # Policy documents
    ├── db/                   # Database files
    │   └── chroma.sqlite3   # ChromaDB storage
    ├── main.py              # FastAPI application entry
    └── pyproject.toml       # Python dependencies
```

## 🚀 Quick Start

### Prerequisites
- **Python**: 3.11 or higher
- **Node.js**: 18 or higher
- **Ollama**: For local LLM hosting
- **UV**: Python package manager (recommended)

### 1. Install Ollama and Download Model
```bash
# Install Ollama (macOS)
brew install ollama

# Start Ollama service
ollama serve

# Download the required model
ollama pull llama3.2:1b
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies using UV
uv sync

# Initialize the database
uv run python init_db.py

# Create sample users
uv run python create_sample_users.py

# Start the backend server
uv run python start_stable_server.py
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 4. Default Login Credentials
```
Admin User:
Username: admin
Password: admin123
Role: Admin

HR User:
Username: hr_user
Password: hr123
Role: HR

Manager User:
Username: manager_user
Password: manager123
Role: Manager

Employee User:
Username: employee_user
Password: emp123
Role: Employee
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the `server/` directory:

```env
# Database
DATABASE_URL=sqlite:///./iic_auth.db

# JWT Configuration
SECRET_KEY=your-super-secret-jwt-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application Settings
APP_NAME=IIC Authentication API
DEBUG=True

# Ollama Configuration
OLLAMA_MODEL=llama3.2:1b
OLLAMA_BASE_URL=http://localhost:11434
```

### Ollama Configuration
Ensure Ollama is running and the model is available:
```bash
# Check if Ollama is running
ollama list

# Test the model
ollama run llama3.2:1b "Hello, how are you?"
```

## 📊 Sample Data Structure

### Employee Data (JSON)
```json
{
  "organization_info": {
    "company_name": "TechCorp Solutions",
    "employees_count": 500,
    "industry": "Technology Services"
  },
  "employees": [
    {
      "employee_id": "EMP0001",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@company.com",
      "department": "Engineering",
      "role": "Senior Software Engineer",
      "manager_id": "EMP0002",
      "salary": 120000,
      "skills": ["Python", "React", "AWS"],
      "access_level": "Employee",
      "projects": [
        {
          "project_id": "PROJ001",
          "project_name": "Customer Portal",
          "role_in_project": "Lead Developer"
        }
      ]
    }
  ]
}
```

### Policy Data (CSV)
```csv
policy_id,policy_name,category,effective_date,description
POL001,Remote Work Policy,HR,2024-01-01,Guidelines for remote work arrangements
POL002,Data Security Policy,IT,2024-01-01,Procedures for handling sensitive data
```

## 🤖 Usage Examples

### Employee Queries
```
User: "What is John Doe's role and department?"
Agent: Employee Information Agent
Response: "John Doe is a Senior Software Engineer in the Engineering department..."

User: "Show me the remote work policy"
Agent: Policy Agent  
Response: "The Remote Work Policy (POL001) allows employees to work remotely..."

User: "How many employees work at TechCorp?"
Agent: Organizational Agent
Response: "TechCorp Solutions currently has 500 employees..."
```

### Role-Based Access
- **Employees**: Can query their own information and general policies
- **Managers**: Can access team member information and departmental data  
- **HR**: Can query all employee information and detailed policy data
- **Admins**: Full system access including user management

## 🧪 Testing the System

### Backend API Testing
```bash
# Test health endpoint
curl http://localhost:8000/health

# Test authentication
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Test chat endpoint (with JWT token)
curl -X POST http://localhost:8000/api/chat/multi-agent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"message": "Tell me about employee policies"}'
```

### Multi-Agent System Testing
```bash
cd server
uv run python -c "
from app.rag.simplified_multi_agent_rag import SimplifiedMultiAgentRAGSystem
rag = SimplifiedMultiAgentRAGSystem()
response = rag.process_query('What is the company mission?', 'test-session')
print(response)
"
```

## 🔧 Advanced Configuration

### Adding New Document Types
1. Place documents in `server/RAG_context/`
2. Update the RAG system to process new file types
3. Restart the backend to reinitialize the vector database

### Customizing Agents
Edit `server/app/rag/simplified_multi_agent_rag.py` to:
- Add new specialized agents
- Modify agent descriptions and capabilities
- Update query routing logic

### Model Configuration
To use different Ollama models:
1. Download the model: `ollama pull MODEL_NAME`
2. Update the model name in configuration
3. Restart the backend server

## 🚀 Deployment

### Production Deployment
1. **Environment Setup**:
   - Set `DEBUG=False` in environment variables
   - Use strong JWT secret keys
   - Configure proper CORS settings

2. **Database**:
   - Consider PostgreSQL for production
   - Set up proper database backups
   - Configure connection pooling

3. **Security**:
   - Use HTTPS in production
   - Implement rate limiting
   - Set up proper firewall rules
   - Regular security audits

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY server/ .
RUN pip install uv && uv sync
EXPOSE 8000
CMD ["uv", "run", "python", "start_stable_server.py"]
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ollama**: For providing excellent local LLM infrastructure
- **CrewAI**: For the multi-agent framework
- **FastAPI**: For the robust backend framework
- **Next.js**: For the modern frontend framework
- **ChromaDB**: For efficient vector database operations

---

**⚠️ Important Notes:**
- This system is designed for offline operation and does not require internet connectivity after initial setup
- All organizational data remains within your local infrastructure
- Regular backups of the database and vector store are recommended
- Monitor system resources when serving multiple concurrent users

For support or questions, please open an issue in the GitHub repository.
