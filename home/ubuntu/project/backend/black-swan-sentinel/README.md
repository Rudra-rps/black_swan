# Black Swan Sentinel

An AI-powered early-warning system that detects and mitigates financial "Black Swan" events (market crashes, regulatory changes, personal finance disasters).

## Features

### Core Functionalities

- **User Portfolio & Activity Tracking**: Secure API endpoints to save and fetch user investments, expenses, cash flow, and asset allocation
- **Risk Scanning Engine**: Scheduled vulnerability scans that analyze portfolio exposure and flag risk patterns
- **News & Policy Monitor**: Real-time financial headlines and RBI/government updates with LLM-powered summarization
- **Disaster Simulator**: Monte Carlo-based simulation of black swan scenarios with structured damage reports
- **Defense Playbook Generator**: LLM-powered mitigation plan generation with JSON-based strategies
- **Authentication & User Management**: JWT-based login system with secure credential management

## Tech Stack

- **Backend**: Python 3.11, FastAPI, Pydantic v2
- **Database**: SQLAlchemy ORM with SQLite (development) / PostgreSQL (production)
- **Migrations**: Alembic
- **Background Jobs**: APScheduler
- **Authentication**: JWT with bcrypt password hashing
- **API Documentation**: Automatic OpenAPI/Swagger documentation

## Project Structure

```
black-swan-sentinel/
├── app/
│   ├── api/v1/
│   │   ├── endpoints/          # API route handlers
│   │   └── router.py           # Main API router
│   ├── core/
│   │   ├── config.py           # Application configuration
│   │   ├── database.py         # Database setup and connection
│   │   ├── deps.py             # FastAPI dependencies
│   │   └── security.py         # Authentication utilities
│   ├── models/                 # SQLAlchemy database models
│   │   ├── user.py
│   │   ├── portfolio.py
│   │   ├── risk.py
│   │   ├── news.py
│   │   └── simulation.py
│   ├── schemas/                # Pydantic request/response models
│   ├── services/               # Business logic services
│   ├── utils/                  # Utility functions
│   └── main.py                 # FastAPI application factory
├── tests/                      # Test files
├── alembic/                    # Database migrations
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables
└── main.py                     # Application entry point
```

## Setup Instructions

### Prerequisites

- Python 3.11+
- pip

### Installation

1. **Clone or extract the project**:
   ```bash
   cd black-swan-sentinel
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   pip install email-validator  # Required for email validation
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.template .env
   # Edit .env with your configuration
   ```

4. **Run the application**:
   ```bash
   python main.py
   ```

The application will start on `http://0.0.0.0:8000`

### API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## Environment Configuration

Key environment variables (see `.env.template` for full list):

```bash
# Application
DEBUG=true
HOST=0.0.0.0
PORT=8000

# Database
DATABASE_URL=sqlite+aiosqlite:///./black_swan_sentinel.db

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30

# External APIs (optional)
NEWS_API_KEY=your-news-api-key
OPENAI_API_KEY=your-openai-api-key

# Risk Scanning
RISK_SCAN_INTERVAL_HOURS=6

# Monte Carlo Simulation
SIMULATION_ITERATIONS=10000
```

## Database Models

### User Management
- **User**: User accounts with authentication and profile information
- **Authentication**: JWT-based token management

### Portfolio Management
- **Portfolio**: User investment portfolios
- **Holding**: Individual asset holdings
- **Transaction**: Transaction history
- **Expense**: Expense tracking
- **Income**: Income tracking

### Risk Management
- **RiskAssessment**: Portfolio risk analysis results
- **RiskAlert**: Risk-based alerts and notifications
- **RiskThreshold**: User-defined risk preferences

### News Monitoring
- **NewsArticle**: Financial news articles with AI analysis
- **NewsAlert**: News-based alerts
- **PolicyUpdate**: Government and RBI policy updates
- **NewsSubscription**: User news preferences

### Disaster Simulation
- **DisasterSimulation**: Black swan scenario simulations
- **DamageReport**: Detailed impact assessments
- **ScenarioTemplate**: Predefined disaster scenarios
- **SimulationResult**: Individual simulation iterations

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Token refresh
- `GET /api/v1/auth/me` - Current user info

### Portfolio Management
- `GET /api/v1/portfolio/` - Get user portfolios
- `POST /api/v1/portfolio/` - Create portfolio
- `GET /api/v1/portfolio/{id}/holdings` - Get holdings
- `POST /api/v1/portfolio/{id}/transactions` - Add transaction

### Risk Analysis
- `GET /api/v1/risk/assessment` - Get risk assessment
- `POST /api/v1/risk/scan` - Trigger risk scan
- `GET /api/v1/risk/alerts` - Get risk alerts

### News Monitoring
- `GET /api/v1/news/` - Get financial news
- `GET /api/v1/news/alerts` - Get news alerts
- `GET /api/v1/news/policy-updates` - Get policy updates

### Disaster Simulation
- `POST /api/v1/simulation/run` - Run simulation
- `GET /api/v1/simulation/scenarios` - Get scenario templates
- `GET /api/v1/simulation/history` - Get simulation history

### Defense Playbook
- `POST /api/v1/playbook/generate` - Generate playbook
- `GET /api/v1/playbook/` - Get user playbooks
- `GET /api/v1/playbook/{id}` - Get specific playbook

## Development Status

### ✅ Completed (Phases 1-2)
- Project structure and configuration
- Database models and relationships
- Authentication system with JWT
- Basic API endpoints structure
- SQLAlchemy setup with async support
- Environment configuration
- OpenAPI documentation setup

### 🚧 In Progress (Phases 3-8)
- Portfolio management APIs
- Risk scanning engine
- News monitoring system
- Disaster simulation with Monte Carlo
- Defense playbook generation
- Background job scheduling
- Comprehensive testing
- Seed data and examples

## Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless token-based authentication
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Input Validation**: Pydantic models for request validation
- **SQL Injection Protection**: SQLAlchemy ORM with parameterized queries

## Future Enhancements

- Real-time WebSocket notifications
- Advanced ML-based risk prediction
- Integration with external financial data providers
- Mobile app support
- Advanced visualization dashboards
- Multi-language support

## Contributing

This is a modular FastAPI backend designed for easy extension and customization. Each component is separated into services, models, and API endpoints for maintainability.

## License

[Add your license information here]

