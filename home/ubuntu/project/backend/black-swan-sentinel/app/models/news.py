from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class NewsSource(enum.Enum):
    """Enum for news sources."""
    RSS_FEED = "rss_feed"
    NEWS_API = "news_api"
    WEB_SCRAPER = "web_scraper"
    MANUAL = "manual"
    RBI = "rbi"
    GOVERNMENT = "government"


class NewsSentiment(enum.Enum):
    """Enum for news sentiment."""
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"
    VERY_NEGATIVE = "very_negative"


class NewsArticle(Base):
    """News articles and financial updates."""
    
    __tablename__ = "news_articles"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Article metadata
    title = Column(String(500), nullable=False)
    url = Column(String(1000), nullable=True)
    source = Column(String(255), nullable=False)
    source_type = Column(String(50), default="news_api")
    author = Column(String(255), nullable=True)
    
    # Article content
    content = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)  # AI-generated summary
    excerpt = Column(Text, nullable=True)
    
    # Classification and analysis
    category = Column(String(100), nullable=True)  # market, policy, sector, etc.
    sectors_affected = Column(JSON, nullable=True)  # List of affected sectors
    assets_mentioned = Column(JSON, nullable=True)  # List of mentioned assets/symbols
    keywords = Column(JSON, nullable=True)  # Extracted keywords
    
    # Sentiment analysis
    sentiment = Column(String(20), nullable=True)
    sentiment_score = Column(Float, nullable=True)  # -1 to 1 scale
    impact_score = Column(Float, nullable=True)  # 0-100 potential market impact
    
    # Article status
    is_processed = Column(Boolean, default=False)
    is_relevant = Column(Boolean, default=True)
    is_archived = Column(Boolean, default=False)
    
    # Timestamps
    published_at = Column(DateTime(timezone=True), nullable=True)
    scraped_at = Column(DateTime(timezone=True), server_default=func.now())
    processed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    alerts = relationship("NewsAlert", back_populates="article", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<NewsArticle(id={self.id}, title='{self.title[:50]}...', source='{self.source}')>"


class NewsAlert(Base):
    """Alerts generated from news articles."""
    
    __tablename__ = "news_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("news_articles.id"), nullable=False)
    
    # Alert details
    alert_type = Column(String(100), nullable=False)  # market_crash, policy_change, etc.
    severity = Column(String(20), nullable=False)  # low, medium, high, critical
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    
    # Alert targeting
    affected_sectors = Column(JSON, nullable=True)  # Sectors that should be alerted
    affected_assets = Column(JSON, nullable=True)  # Specific assets affected
    user_criteria = Column(JSON, nullable=True)  # User filtering criteria
    
    # Alert status
    is_active = Column(Boolean, default=True)
    is_sent = Column(Boolean, default=False)
    sent_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    article = relationship("NewsArticle", back_populates="alerts")
    
    def __repr__(self):
        return f"<NewsAlert(id={self.id}, type='{self.alert_type}', severity='{self.severity}')>"


class PolicyUpdate(Base):
    """Government and RBI policy updates."""
    
    __tablename__ = "policy_updates"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Policy details
    title = Column(String(500), nullable=False)
    policy_type = Column(String(100), nullable=False)  # monetary, fiscal, regulatory
    issuing_authority = Column(String(255), nullable=False)  # RBI, Finance Ministry, etc.
    policy_number = Column(String(100), nullable=True)
    
    # Content
    description = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)  # AI-generated summary
    full_text = Column(Text, nullable=True)
    document_url = Column(String(1000), nullable=True)
    
    # Impact analysis
    sectors_affected = Column(JSON, nullable=True)
    asset_classes_affected = Column(JSON, nullable=True)
    impact_assessment = Column(Text, nullable=True)  # AI-generated impact analysis
    impact_score = Column(Float, nullable=True)  # 0-100 scale
    
    # Policy status
    status = Column(String(50), default="announced")  # announced, effective, withdrawn
    effective_date = Column(DateTime(timezone=True), nullable=True)
    expiry_date = Column(DateTime(timezone=True), nullable=True)
    
    # Processing status
    is_processed = Column(Boolean, default=False)
    processed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    announced_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<PolicyUpdate(id={self.id}, title='{self.title[:50]}...', type='{self.policy_type}')>"


class NewsSubscription(Base):
    """User subscriptions to news categories and alerts."""
    
    __tablename__ = "news_subscriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Subscription preferences
    categories = Column(JSON, nullable=True)  # List of subscribed categories
    sectors = Column(JSON, nullable=True)  # List of subscribed sectors
    keywords = Column(JSON, nullable=True)  # Custom keywords to track
    
    # Alert preferences
    min_impact_score = Column(Float, default=50.0)  # Minimum impact score for alerts
    alert_frequency = Column(String(20), default="immediate")  # immediate, daily, weekly
    
    # Notification settings
    email_alerts = Column(Boolean, default=True)
    push_notifications = Column(Boolean, default=True)
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User")
    
    def __repr__(self):
        return f"<NewsSubscription(id={self.id}, user_id={self.user_id})>"

