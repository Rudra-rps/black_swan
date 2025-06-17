from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/")
async def get_news(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get latest financial news."""
    # TODO: Implement news retrieval
    return {"message": "News monitoring - Coming soon"}


@router.get("/alerts")
async def get_news_alerts(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get news-based alerts."""
    # TODO: Implement news alerts retrieval
    return {"message": "News alerts - Coming soon"}


@router.get("/policy-updates")
async def get_policy_updates(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get policy updates."""
    # TODO: Implement policy updates retrieval
    return {"message": "Policy updates - Coming soon"}

