#!/usr/bin/env python3
"""
Stable development server without auto-reload to avoid .venv watching issues
"""
import uvicorn

if __name__ == "__main__":
    # Run the server without reload for stability
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,  # Disabled to prevent .venv issues
        log_level="info"
    )
