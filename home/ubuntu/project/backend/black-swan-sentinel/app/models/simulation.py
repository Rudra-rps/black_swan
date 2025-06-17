from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class ScenarioType(enum.Enum):
    """Enum for disaster scenario types."""
    MARKET_CRASH = "market_crash"
    SECTOR_COLLAPSE = "sector_collapse"
    CURRENCY_DEVALUATION = "currency_devaluation"
    INTEREST_RATE_SHOCK = "interest_rate_shock"
    INFLATION_SURGE = "inflation_surge"
    JOB_LOSS = "job_loss"
    HEALTH_EMERGENCY = "health_emergency"
    NATURAL_DISASTER = "natural_disaster"
    REGULATORY_CHANGE = "regulatory_change"
    CUSTOM = "custom"


class SimulationStatus(enum.Enum):
    """Enum for simulation status."""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class DisasterSimulation(Base):
    """Disaster simulation scenarios and results."""
    
    __tablename__ = "disaster_simulations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    
    # Simulation metadata
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    scenario_type = Column(String(50), nullable=False)
    
    # Scenario parameters
    scenario_config = Column(JSON, nullable=False)  # Scenario-specific parameters
    simulation_parameters = Column(JSON, nullable=True)  # Monte Carlo parameters
    
    # Simulation settings
    iterations = Column(Integer, default=10000)
    time_horizon_days = Column(Integer, default=365)
    confidence_levels = Column(JSON, default=lambda: [95, 99])  # Confidence intervals
    
    # Results
    status = Column(String(20), default="pending")
    results = Column(JSON, nullable=True)  # Detailed simulation results
    summary = Column(JSON, nullable=True)  # Summary statistics
    
    # Key metrics from results
    expected_loss = Column(Float, nullable=True)  # Expected portfolio loss
    worst_case_loss = Column(Float, nullable=True)  # 99th percentile loss
    probability_of_ruin = Column(Float, nullable=True)  # Probability of >90% loss
    recovery_time_days = Column(Integer, nullable=True)  # Expected recovery time
    
    # Execution details
    execution_time_seconds = Column(Float, nullable=True)
    error_message = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="simulations")
    portfolio = relationship("Portfolio")
    damage_reports = relationship("DamageReport", back_populates="simulation", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<DisasterSimulation(id={self.id}, name='{self.name}', type='{self.scenario_type}')>"


class DamageReport(Base):
    """Detailed damage assessment from simulation."""
    
    __tablename__ = "damage_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    simulation_id = Column(Integer, ForeignKey("disaster_simulations.id"), nullable=False)
    
    # Overall impact
    total_portfolio_loss = Column(Float, nullable=False)  # Absolute loss amount
    total_portfolio_loss_percent = Column(Float, nullable=False)  # Percentage loss
    
    # Asset-level impacts
    asset_impacts = Column(JSON, nullable=True)  # Per-asset impact breakdown
    sector_impacts = Column(JSON, nullable=True)  # Per-sector impact breakdown
    
    # Liquidity analysis
    liquid_assets_remaining = Column(Float, nullable=True)
    liquidity_shortfall = Column(Float, nullable=True)
    forced_liquidation_amount = Column(Float, nullable=True)
    
    # Cash flow impact
    monthly_income_impact = Column(Float, nullable=True)  # Change in monthly income
    monthly_expense_increase = Column(Float, nullable=True)  # Additional expenses
    cash_runway_months = Column(Float, nullable=True)  # Months of expenses covered
    
    # Recovery analysis
    estimated_recovery_time = Column(Integer, nullable=True)  # Days to recover
    recovery_strategy = Column(JSON, nullable=True)  # Recommended recovery actions
    
    # Risk metrics
    new_risk_score = Column(Float, nullable=True)  # Post-disaster risk score
    risk_score_change = Column(Float, nullable=True)  # Change in risk score
    
    # Timestamps
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    simulation = relationship("DisasterSimulation", back_populates="damage_reports")
    
    def __repr__(self):
        return f"<DamageReport(id={self.id}, simulation_id={self.simulation_id}, loss={self.total_portfolio_loss_percent}%)>"


class ScenarioTemplate(Base):
    """Predefined disaster scenario templates."""
    
    __tablename__ = "scenario_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Template details
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    scenario_type = Column(String(50), nullable=False)
    category = Column(String(100), nullable=False)  # market, personal, economic, etc.
    
    # Template configuration
    default_parameters = Column(JSON, nullable=False)  # Default scenario parameters
    parameter_ranges = Column(JSON, nullable=True)  # Valid parameter ranges
    
    # Template metadata
    severity_level = Column(String(20), nullable=False)  # low, medium, high, extreme
    historical_precedent = Column(Text, nullable=True)  # Historical examples
    probability_estimate = Column(Float, nullable=True)  # Annual probability estimate
    
    # Usage statistics
    usage_count = Column(Integer, default=0)
    average_rating = Column(Float, nullable=True)
    
    # Status
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<ScenarioTemplate(id={self.id}, name='{self.name}', type='{self.scenario_type}')>"


class SimulationResult(Base):
    """Individual simulation iteration results."""
    
    __tablename__ = "simulation_results"
    
    id = Column(Integer, primary_key=True, index=True)
    simulation_id = Column(Integer, ForeignKey("disaster_simulations.id"), nullable=False)
    
    # Iteration details
    iteration_number = Column(Integer, nullable=False)
    random_seed = Column(Integer, nullable=True)
    
    # Results for this iteration
    portfolio_value_path = Column(JSON, nullable=True)  # Value over time
    final_portfolio_value = Column(Float, nullable=False)
    total_loss = Column(Float, nullable=False)
    loss_percentage = Column(Float, nullable=False)
    
    # Timing results
    max_drawdown = Column(Float, nullable=True)
    max_drawdown_day = Column(Integer, nullable=True)
    recovery_day = Column(Integer, nullable=True)
    
    # Asset-specific results
    asset_final_values = Column(JSON, nullable=True)
    asset_losses = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    simulation = relationship("DisasterSimulation")
    
    def __repr__(self):
        return f"<SimulationResult(id={self.id}, iteration={self.iteration_number}, loss={self.loss_percentage}%)>"

