#!/usr/bin/env python3
"""
Create sample users for testing
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models.user import User, UserRole
from app.core.auth import get_password_hash
from app.core.user_service import get_user_by_username
import uuid

def create_sample_users():
    """Create sample users for testing."""
    
    # Create engine and session
    engine = create_engine(settings.database_url)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    sample_users = [
        {
            "username": "admin",
            "password": "admin123",
            "role": UserRole.ADMIN
        },
        {
            "username": "hr_manager",
            "password": "hr123",
            "role": UserRole.HR
        },
        {
            "username": "team_manager",
            "password": "manager123",
            "role": UserRole.MANAGER
        },
        {
            "username": "employee1",
            "password": "emp123",
            "role": UserRole.EMPLOYEE
        }
    ]
    
    try:
        created_count = 0
        for user_data in sample_users:
            # Check if user already exists
            existing_user = get_user_by_username(db, user_data["username"])
            
            if not existing_user:
                new_user = User(
                    id=uuid.uuid4(),
                    username=user_data["username"],
                    password_hash=get_password_hash(user_data["password"]),
                    role=user_data["role"],
                    is_active=True
                )
                
                db.add(new_user)
                created_count += 1
                print(f"✅ Created user: {user_data['username']} (Role: {user_data['role']})")
            else:
                print(f"ℹ️  User {user_data['username']} already exists, skipping.")
        
        if created_count > 0:
            db.commit()
            print(f"\n🎉 Successfully created {created_count} sample users!")
            print("\n📋 Demo Credentials:")
            print("Admin         - Username: admin         | Password: admin123")
            print("HR Manager    - Username: hr_manager    | Password: hr123")
            print("Team Manager  - Username: team_manager  | Password: manager123")
            print("Employee      - Username: employee1     | Password: emp123")
        else:
            print("\nℹ️  No new users created (all already exist).")
            
    except Exception as e:
        print(f"❌ Error creating sample users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("👥 Creating sample users for testing...")
    create_sample_users()
    print("✅ Sample user creation completed!")
