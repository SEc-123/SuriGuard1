@echo off
setlocal enabledelayedexpansion

:: SuriGuard Deployment Script (Windows)
:: Version: 1.0.0

:: Color codes
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "RESET=[0m"

:: Logging functions
set "log=echo %GREEN%[DEPLOY]%RESET%"
set "warn=echo %YELLOW%[WARNING]%RESET%"
set "error=echo %RED%[ERROR]%RESET% && exit /b 1"

:: Check prerequisites
call :check_prerequisites
if errorlevel 1 exit /b 1

:: Install dependencies
call :install_dependencies
if errorlevel 1 exit /b 1

:: Build project
call :build_project
if errorlevel 1 exit /b 1

:: Initialize database
call :init_database

%log% "Deployment completed successfully!"

set /p start_app="Do you want to start the application? (y/n): "
if /i "%start_app%"=="y" (
    call :start_application
)

exit /b 0

:check_prerequisites
%log% "Checking system prerequisites..."
where node >nul 2>nul
if errorlevel 1 (
    %error% "Node.js is not installed. Please install Node.js v16 or higher."
)
where npm >nul 2>nul
if errorlevel 1 (
    %error% "npm is not installed. Please install npm."
)
exit /b 0

:install_dependencies
%log% "Installing project dependencies..."
call npm install
if errorlevel 1 (
    %error% "Failed to install dependencies"
)
exit /b 0

:build_project
%log% "Building the project..."
call npm run build
if errorlevel 1 (
    %error% "Build process failed"
)
exit /b 0

:init_database
%log% "Initializing database..."
call npm run db:init
if errorlevel 1 (
    %warn% "Database initialization may have issues"
)
exit /b 0

:start_application
%log% "Starting SuriGuard application..."
call npm run dev
exit /b 0
