# Black Swan Sentinel

Black Swan Sentinel is a full-stack application designed to monitor, simulate, and defend against rare and impactful events ("black swans") in financial or operational systems. The project consists of a Python backend (FastAPI) and a modern Next.js frontend.

---

## Project Structure

```
home/
  ubuntu/
    project/
      backend/
        black-swan-sentinel/      # FastAPI backend
          app/                   # Main application code
          scripts/               # Utility scripts (e.g., seed data)
          tests/                 # Backend tests
          alembic/               # Database migrations
          requirements.txt       # Python dependencies
      frontend/                  # Next.js frontend
        components/              # React components
        hooks/                   # Custom React hooks
        lib/                     # Utilities (API, helpers)
        public/                  # Static assets
        styles/                  # Global styles
        app/                     # Next.js app directory
        package.json             # Frontend dependencies
```

---

## Backend (FastAPI)

- **Location:** `home/ubuntu/project/backend/black-swan-sentinel/`
- **Main entry:** `main.py`
- **Features:**
  - RESTful API for simulation, defense, and policy management
  - Database support (SQLite by default)
  - Alembic migrations
  - Seed scripts for initial data

### Setup

1. Navigate to the backend directory:
   ```sh
   cd home/ubuntu/project/backend/black-swan-sentinel
   ```
2. (Recommended) Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run database migrations:
   ```sh
   alembic upgrade head
   ```
5. (Optional) Seed the database:
   ```sh
   python scripts/seed_data.py
   ```
6. Start the API server:
   ```sh
   uvicorn app.main:app --reload
   ```

---

## Frontend (Next.js)

- **Location:** `home/ubuntu/project/frontend/`
- **Main entry:** `app/page.tsx`
- **Features:**
  - Modern UI with Tailwind CSS
  - Modular React components
  - Pages for login, simulation, defense, policy, and results

### Setup

1. Navigate to the frontend directory:
   ```sh
   cd home/ubuntu/project/frontend
   ```
2. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```
3. Start the development server:
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
4. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Notes

- Ensure the backend is running before using the frontend for full functionality.
- Update environment variables as needed for database, API URLs, etc.
- For production, configure proper deployment and security settings.

---

## License

This project is licensed under the MIT License.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For questions or support, please open an issue on GitHub.
