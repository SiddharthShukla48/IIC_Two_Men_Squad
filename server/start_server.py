#!/usr/bin/env python3
"""
Development server startup script
"""

import uvicorn
import os
from app.core.config import settings

if __name__ == "__main__":
    print("🚀 Starting IIC Authentication Server...")
    print(f"📱 API Documentation: http://localhost:8000/docs")
    print(f"🔧 Environment: {'Development' if settings.debug else 'Production'}")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        log_level="info"
    )
