from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/run")
async def run_simulation(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Run disaster simulation."""
    # TODO: Implement disaster simulation
    return {"message": "Disaster simulation - Coming soon"}


@router.get("/scenarios")
async def get_scenario_templates(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get available scenario templates."""
    # TODO: Implement scenario templates retrieval
    return {"message": "Scenario templates - Coming soon"}


@router.get("/history")
async def get_simulation_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get simulation history."""
    # TODO: Implement simulation history retrieval
    return {"message": "Simulation history - Coming soon"}

