@echo off
REM Abre o Docker Desktop (caso não esteja aberto)
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
REM Aguarda alguns segundos para garantir que o Docker está inicializado
TIMEOUT /T 10
REM Sobe os containers definidos no docker-compose.yml
cd backend
call docker compose up -d
cd .. 