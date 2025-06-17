from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/generate")
async def generate_playbook(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Generate defense playbook."""
    # TODO: Implement playbook generation
    return {"message": "Defense playbook generation - Coming soon"}


@router.get("/")
async def get_playbooks(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's defense playbooks."""
    # TODO: Implement playbook retrieval
    return {"message": "Defense playbooks - Coming soon"}


@router.get("/{playbook_id}")
async def get_playbook(
    playbook_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get specific playbook."""
    # TODO: Implement specific playbook retrieval
    return {"message": "Specific playbook - Coming soon"}

