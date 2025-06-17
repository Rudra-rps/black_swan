from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    users,
    portfolio,
    risk,
    news,
    simulation,
    playbook
)

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(risk.router, prefix="/risk", tags=["risk-analysis"])
api_router.include_router(news.router, prefix="/news", tags=["news-monitoring"])
api_router.include_router(simulation.router, prefix="/simulation", tags=["disaster-simulation"])
api_router.include_router(playbook.router, prefix="/playbook", tags=["defense-playbook"])

