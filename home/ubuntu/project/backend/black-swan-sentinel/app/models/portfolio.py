from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class AssetType(enum.Enum):
    """Enum for different asset types."""
    EQUITY = "equity"
    BOND = "bond"
    MUTUAL_FUND = "mutual_fund"
    ETF = "etf"
    COMMODITY = "commodity"
    REAL_ESTATE = "real_estate"
    CRYPTO = "crypto"
    CASH = "cash"
    OTHER = "other"


class TransactionType(enum.Enum):
    """Enum for transaction types."""
    BUY = "buy"
    SELL = "sell"
    DIVIDEND = "dividend"
    INTEREST = "interest"
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"


class Portfolio(Base):
    """Portfolio model to track user's overall investment portfolio."""
    
    __tablename__ = "portfolios"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # Portfolio metrics
    total_value = Column(Float, default=0.0)
    cash_balance = Column(Float, default=0.0)
    
    # Risk metrics
    risk_score = Column(Float, nullable=True)  # 0-100 scale
    diversification_score = Column(Float, nullable=True)  # 0-100 scale
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="portfolios")
    holdings = relationship("Holding", back_populates="portfolio", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="portfolio", cascade="all, delete-orphan")
    expenses = relationship("Expense", back_populates="portfolio", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Portfolio(id={self.id}, name='{self.name}', user_id={self.user_id})>"


class Holding(Base):
    """Individual asset holdings within a portfolio."""
    
    __tablename__ = "holdings"
    
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    
    # Asset information
    symbol = Column(String(50), nullable=False)  # Stock symbol, fund code, etc.
    name = Column(String(255), nullable=False)
    asset_type = Column(Enum(AssetType), nullable=False)
    sector = Column(String(100), nullable=True)
    
    # Holding details
    quantity = Column(Float, nullable=False)
    average_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=True)
    current_value = Column(Float, nullable=True)
    
    # Performance metrics
    unrealized_gain_loss = Column(Float, default=0.0)
    unrealized_gain_loss_percent = Column(Float, default=0.0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_price_update = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    portfolio = relationship("Portfolio", back_populates="holdings")
    
    def __repr__(self):
        return f"<Holding(id={self.id}, symbol='{self.symbol}', quantity={self.quantity})>"


class Transaction(Base):
    """Transaction history for portfolio activities."""
    
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    
    # Transaction details
    transaction_type = Column(Enum(TransactionType), nullable=False)
    symbol = Column(String(50), nullable=True)  # Null for cash transactions
    quantity = Column(Float, nullable=True)
    price = Column(Float, nullable=True)
    amount = Column(Float, nullable=False)  # Total transaction amount
    
    # Additional information
    description = Column(Text, nullable=True)
    external_id = Column(String(255), nullable=True)  # For external system integration
    
    # Timestamps
    transaction_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    portfolio = relationship("Portfolio", back_populates="transactions")
    
    def __repr__(self):
        return f"<Transaction(id={self.id}, type='{self.transaction_type}', amount={self.amount})>"


class Expense(Base):
    """User expenses and cash flow tracking."""
    
    __tablename__ = "expenses"
    
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    
    # Expense details
    category = Column(String(100), nullable=False)  # housing, food, transport, etc.
    subcategory = Column(String(100), nullable=True)
    amount = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    
    # Expense type
    is_recurring = Column(Boolean, default=False)
    frequency = Column(String(20), nullable=True)  # monthly, weekly, yearly
    
    # Timestamps
    expense_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    portfolio = relationship("Portfolio", back_populates="expenses")
    
    def __repr__(self):
        return f"<Expense(id={self.id}, category='{self.category}', amount={self.amount})>"


class Income(Base):
    """User income tracking."""
    
    __tablename__ = "income"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Income details
    source = Column(String(255), nullable=False)  # salary, freelance, investment, etc.
    amount = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    
    # Income type
    is_recurring = Column(Boolean, default=True)
    frequency = Column(String(20), default="monthly")  # monthly, weekly, yearly
    
    # Timestamps
    income_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User")
    
    def __repr__(self):
        return f"<Income(id={self.id}, source='{self.source}', amount={self.amount})>"

