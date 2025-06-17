from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings(BaseSettings):
    """Application settings and configuration."""
    
    # Application settings
    app_name: str = "Black Swan Sentinel"
    app_version: str = "1.0.0"
    debug: bool = Field(default=False, env="DEBUG")
    
    # Server settings
    host: str = Field(default="0.0.0.0", env="HOST")
    port: int = Field(default=8000, env="PORT")
    
    # Database settings
    database_url: str = Field(
        default="sqlite+aiosqlite:///./black_swan_sentinel.db",
        env="DATABASE_URL"
    )
    
    # Security settings
    secret_key: str = Field(
        default="your-secret-key-change-in-production",
        env="SECRET_KEY"
    )
    algorithm: str = Field(default="HS256", env="ALGORITHM")
    access_token_expire_minutes: int = Field(
        default=30, 
        env="ACCESS_TOKEN_EXPIRE_MINUTES"
    )
    
    # External API settings
    news_api_key: Optional[str] = Field(default=None, env="NEWS_API_KEY")
    openai_api_key: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    
    # Risk scanning settings
    risk_scan_interval_hours: int = Field(
        default=6, 
        env="RISK_SCAN_INTERVAL_HOURS"
    )
    
    # Monte Carlo simulation settings
    simulation_iterations: int = Field(
        default=10000, 
        env="SIMULATION_ITERATIONS"
    )
    
    # CORS settings - simplified
    cors_origins: str = Field(default="*")
    
    def get_cors_origins(self) -> list[str]:
        """Get CORS origins as a list."""
        cors_value = os.getenv("CORS_ORIGINS", "*")
        if cors_value == "*":
            return ["*"]
        return [origin.strip() for origin in cors_value.split(",")]
    
    class Config:
        case_sensitive = False


# Global settings instance
settings = Settings()

