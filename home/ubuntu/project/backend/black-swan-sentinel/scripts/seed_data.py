#!/usr/bin/env python3
"""
Seed data script for Black Swan Sentinel
Creates sample users and portfolios for testing
"""

import asyncio
import sys
import os
from datetime import datetime, timedelta

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal, init_db
from app.core.security import get_password_hash
from app.models.user import User
from app.models.portfolio import Portfolio, Holding, Transaction, AssetType, TransactionType


async def create_sample_data():
    """Create sample users and portfolios."""
    
    # Initialize database
    await init_db()
    
    async with AsyncSessionLocal() as db:
        try:
            # Create admin user
            admin_user = User(
                email="admin@blackswansentinel.com",
                username="admin",
                hashed_password=get_password_hash("admin123"),
                full_name="System Administrator",
                is_admin=True,
                risk_tolerance="moderate"
            )
            db.add(admin_user)
            
            # Create sample user
            sample_user = User(
                email="john.doe@example.com",
                username="johndoe",
                hashed_password=get_password_hash("password123"),
                full_name="John Doe",
                phone_number="+1-555-0123",
                risk_tolerance="moderate"
            )
            db.add(sample_user)
            
            await db.commit()
            await db.refresh(admin_user)
            await db.refresh(sample_user)
            
            # Create sample portfolio for the user
            portfolio = Portfolio(
                user_id=sample_user.id,
                name="Main Investment Portfolio",
                description="Primary investment portfolio with diversified holdings",
                total_value=150000.0,
                cash_balance=15000.0
            )
            db.add(portfolio)
            await db.commit()
            await db.refresh(portfolio)
            
            # Create sample holdings
            holdings = [
                Holding(
                    portfolio_id=portfolio.id,
                    symbol="NIFTY50",
                    name="Nifty 50 Index Fund",
                    asset_type=AssetType.ETF,
                    sector="Diversified",
                    quantity=1000,
                    average_price=120.0,
                    current_price=125.0,
                    current_value=125000.0,
                    unrealized_gain_loss=5000.0,
                    unrealized_gain_loss_percent=4.17
                ),
                Holding(
                    portfolio_id=portfolio.id,
                    symbol="GOLD",
                    name="Gold ETF",
                    asset_type=AssetType.COMMODITY,
                    sector="Precious Metals",
                    quantity=50,
                    average_price=200.0,
                    current_price=195.0,
                    current_value=9750.0,
                    unrealized_gain_loss=-250.0,
                    unrealized_gain_loss_percent=-2.5
                ),
                Holding(
                    portfolio_id=portfolio.id,
                    symbol="CASH",
                    name="Cash Holdings",
                    asset_type=AssetType.CASH,
                    sector="Cash",
                    quantity=1,
                    average_price=15000.0,
                    current_price=15000.0,
                    current_value=15000.0,
                    unrealized_gain_loss=0.0,
                    unrealized_gain_loss_percent=0.0
                )
            ]
            
            for holding in holdings:
                db.add(holding)
            
            # Create sample transactions
            base_date = datetime.now() - timedelta(days=30)
            transactions = [
                Transaction(
                    portfolio_id=portfolio.id,
                    transaction_type=TransactionType.BUY,
                    symbol="NIFTY50",
                    quantity=1000,
                    price=120.0,
                    amount=120000.0,
                    description="Initial investment in Nifty 50 Index Fund",
                    transaction_date=base_date
                ),
                Transaction(
                    portfolio_id=portfolio.id,
                    transaction_type=TransactionType.BUY,
                    symbol="GOLD",
                    quantity=50,
                    price=200.0,
                    amount=10000.0,
                    description="Gold ETF purchase for diversification",
                    transaction_date=base_date + timedelta(days=5)
                ),
                Transaction(
                    portfolio_id=portfolio.id,
                    transaction_type=TransactionType.DEPOSIT,
                    symbol=None,
                    quantity=None,
                    price=None,
                    amount=15000.0,
                    description="Cash deposit for liquidity",
                    transaction_date=base_date + timedelta(days=10)
                )
            ]
            
            for transaction in transactions:
                db.add(transaction)
            
            await db.commit()
            
            print("✅ Sample data created successfully!")
            print(f"👤 Admin User: admin / admin123")
            print(f"👤 Sample User: johndoe / password123")
            print(f"💼 Sample Portfolio: {portfolio.name}")
            print(f"📊 Total Portfolio Value: ₹{portfolio.total_value:,.2f}")
            print(f"💰 Cash Balance: ₹{portfolio.cash_balance:,.2f}")
            print(f"📈 Holdings: {len(holdings)} assets")
            print(f"📋 Transactions: {len(transactions)} records")
            
        except Exception as e:
            await db.rollback()
            print(f"❌ Error creating sample data: {e}")
            raise


if __name__ == "__main__":
    asyncio.run(create_sample_data())

