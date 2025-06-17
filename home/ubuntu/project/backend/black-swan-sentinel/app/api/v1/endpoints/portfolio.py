from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/")
async def get_portfolios(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user portfolios."""
    # TODO: Implement portfolio retrieval
    return {"message": "Portfolio endpoints - Coming soon"}


@router.post("/")
async def create_portfolio(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new portfolio."""
    # TODO: Implement portfolio creation
    return {"message": "Portfolio creation - Coming soon"}


@router.get("/{portfolio_id}/holdings")
async def get_portfolio_holdings(
    portfolio_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get portfolio holdings."""
    # TODO: Implement holdings retrieval
    return {"message": "Portfolio holdings - Coming soon"}


@router.post("/{portfolio_id}/transactions")
async def add_transaction(
    portfolio_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Add a new transaction."""
    # TODO: Implement transaction creation
    return {"message": "Transaction creation - Coming soon"}

