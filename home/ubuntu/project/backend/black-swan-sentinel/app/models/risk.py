from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class RiskLevel(enum.Enum):
    """Enum for risk levels."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class RiskAssessment(Base):
    """Risk assessment results for user portfolios."""
    
    __tablename__ = "risk_assessments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    
    # Overall risk metrics
    overall_risk_score = Column(Float, nullable=False)  # 0-100 scale
    risk_level = Column(String(20), nullable=False)  # low, medium, high, critical
    
    # Specific risk factors
    concentration_risk = Column(Float, default=0.0)  # Single asset concentration
    sector_concentration_risk = Column(Float, default=0.0)  # Sector concentration
    liquidity_risk = Column(Float, default=0.0)  # Portfolio liquidity risk
    volatility_risk = Column(Float, default=0.0)  # Price volatility risk
    correlation_risk = Column(Float, default=0.0)  # Asset correlation risk
    
    # Cash flow risks
    burn_rate_risk = Column(Float, default=0.0)  # Monthly expenses vs income
    emergency_fund_adequacy = Column(Float, default=0.0)  # Emergency fund coverage
    
    # Risk analysis details
    risk_factors = Column(JSON, nullable=True)  # Detailed risk breakdown
    recommendations = Column(JSON, nullable=True)  # Risk mitigation recommendations
    
    # Assessment metadata
    assessment_type = Column(String(50), default="scheduled")  # scheduled, manual, triggered
    confidence_score = Column(Float, nullable=True)  # Assessment confidence
    
    # Timestamps
    assessed_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="risk_assessments")
    portfolio = relationship("Portfolio")
    alerts = relationship("RiskAlert", back_populates="assessment", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<RiskAssessment(id={self.id}, user_id={self.user_id}, risk_score={self.overall_risk_score})>"


class RiskAlert(Base):
    """Risk alerts and notifications."""
    
    __tablename__ = "risk_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("risk_assessments.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Alert details
    alert_type = Column(String(100), nullable=False)  # concentration, liquidity, volatility, etc.
    severity = Column(String(20), nullable=False)  # low, medium, high, critical
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    
    # Alert data
    current_value = Column(Float, nullable=True)
    threshold_value = Column(Float, nullable=True)
    affected_assets = Column(JSON, nullable=True)  # List of affected assets/holdings
    
    # Alert status
    is_active = Column(Boolean, default=True)
    is_acknowledged = Column(Boolean, default=False)
    acknowledged_at = Column(DateTime(timezone=True), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    triggered_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    assessment = relationship("RiskAssessment", back_populates="alerts")
    user = relationship("User")
    
    def __repr__(self):
        return f"<RiskAlert(id={self.id}, type='{self.alert_type}', severity='{self.severity}')>"


class RiskThreshold(Base):
    """User-defined risk thresholds and preferences."""
    
    __tablename__ = "risk_thresholds"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Threshold settings
    max_single_asset_percentage = Column(Float, default=20.0)  # Max % in single asset
    max_sector_percentage = Column(Float, default=30.0)  # Max % in single sector
    min_liquidity_percentage = Column(Float, default=10.0)  # Min % in liquid assets
    max_volatility_threshold = Column(Float, default=25.0)  # Max portfolio volatility
    
    # Cash flow thresholds
    min_emergency_fund_months = Column(Float, default=6.0)  # Emergency fund coverage
    max_burn_rate_ratio = Column(Float, default=0.8)  # Max expenses/income ratio
    
    # Alert preferences
    enable_concentration_alerts = Column(Boolean, default=True)
    enable_volatility_alerts = Column(Boolean, default=True)
    enable_liquidity_alerts = Column(Boolean, default=True)
    enable_cashflow_alerts = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User")
    
    def __repr__(self):
        return f"<RiskThreshold(id={self.id}, user_id={self.user_id})>"

