@echo off
title Roamly - Starting Servers...
echo.
echo  ========================================
echo    ROAMLY - Starting Development Servers
echo  ========================================
echo.

:: Kill any process already using port 5000 (stale server)
echo [Cleanup] Freeing port 5000...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":5000 " ^| findstr "LISTENING"') do (
  echo   Killing stale process PID %%a on port 5000
  taskkill /F /PID %%a >nul 2>&1
)

:: Kill any process already using port 5173-5177 (stale Vite)
echo [Cleanup] Freeing Vite ports...
for %%p in (5173 5174 5175 5176 5177) do (
  for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":%%p " ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
  )
)

:: Check if node_modules exist at root
if not exist "%~dp0node_modules" (
  echo [Setup] Installing root dependencies...
  cd /d "%~dp0"
  call npm install
)

echo.
echo [Starting] Backend (port 5000) + Frontend (port 5173)
echo.
echo  TIP: Press Ctrl+C to stop both servers
echo.

cd /d "%~dp0"
npm run dev

pause
