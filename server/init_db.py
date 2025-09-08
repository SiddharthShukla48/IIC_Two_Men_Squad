#!/usr/bin/env python3
"""
Database initialization script.
Creates the database tables and adds a default admin user.
"""

import asyncio
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base
from app.core.config import settings
from app.models.user import User, UserRole
from app.core.auth import get_password_hash
import uuid

def init_db():
    """Initialize database with tables and default admin user."""
    
    # Create engine
    engine = create_engine(settings.database_url)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    
    # Create session
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Check if admin user already exists
        admin_user = db.query(User).filter(User.username == "admin").first()
        
        if not admin_user:
            # Create default admin user
            admin_user = User(
                username="admin",
                password_hash=get_password_hash("admin123"),  # Change this password!
                role=UserRole.ADMIN,
                is_active=True
            )
            
            db.add(admin_user)
            db.commit()
            print("✅ Default admin user created!")
            print("   Username: admin")
            print("   Password: admin123")
            print("   ⚠️  IMPORTANT: Change the admin password after first login!")
        else:
            print("ℹ️  Admin user already exists, skipping creation.")
            
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Initializing database...")
    init_db()
    print("✅ Database initialization completed!")
