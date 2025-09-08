#!/usr/bin/env python3
"""
Development server with proper file watching exclusions
"""
import uvicorn
import os
from pathlib import Path

if __name__ == "__main__":
    # Get the current directory
    current_dir = Path(__file__).parent
    
    # Only watch specific directories to avoid .venv watching issues
    reload_dirs = [
        str(current_dir / "app"),
        str(current_dir / "main.py"),
    ]
    
    # Exclude patterns to prevent unnecessary reloads
    exclude_patterns = [
        "*.pyc",
        "__pycache__/*",
        "*.log",
        "*.db",
        "*.sqlite*",
        "*.lock",
        "test_*.py",
        ".git/*",
        ".venv/*",
        "node_modules/*",
        ".next/*",
        "db/*",
        "*.crewai-rag-tool.lock",
        "alembic/*",
        "*.ini"
    ]
    
    # Run the server with proper exclusions
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=reload_dirs,
        reload_excludes=exclude_patterns,
        log_level="info"
    )
