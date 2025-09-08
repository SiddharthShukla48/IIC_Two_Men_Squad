#!/bin/bash

# IIC Organizational Chatbot Setup Script
# This script sets up both frontend and backend

set -e

echo "🚀 IIC Organizational Chatbot Setup"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the IIC project root directory"
    echo "   Expected structure: ./server/ and ./client/"
    exit 1
fi

echo "📋 Setting up FastAPI Backend..."
echo "--------------------------------"

cd server

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "❌ UV package manager not found. Please install UV first:"
    echo "   curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

echo "  ✅ Installing Python dependencies with UV..."
uv sync

echo "  ✅ Initializing database and creating admin user..."
uv run python init_db.py

echo "  ✅ Creating sample users for testing..."
uv run python create_sample_users.py

echo ""
echo "📋 Setting up Next.js Frontend..."
echo "--------------------------------"

cd ../client

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Installing pnpm..."
    npm install -g pnpm
fi

echo "  ✅ Installing Node.js dependencies with pnpm..."
pnpm install

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "🔧 To start the development servers:"
echo ""
echo "Backend (Terminal 1):"
echo "  cd server"
echo "  uv run python main.py"
echo "  # Server will run on http://localhost:8000"
echo ""
echo "Frontend (Terminal 2):"
echo "  cd client"
echo "  pnpm dev"
echo "  # App will run on http://localhost:3000"
echo ""
echo "🔐 Demo Login Credentials:"
echo "  Admin:    admin / admin123"
echo "  HR:       hr_manager / hr123"
echo "  Manager:  team_manager / manager123"
echo "  Employee: employee1 / emp123"
echo ""
echo "📚 Documentation:"
echo "  API Docs: http://localhost:8000/docs"
echo "  Frontend: http://localhost:3000"
echo ""
echo "🏆 Project ready for development and testing!"
