@echo off
REM Inicia o frontend (React)
start cmd /k "cd frontend && npm run dev"
REM Inicia o backend (Node.js)
start cmd /k "cd backend && npm run dev" 