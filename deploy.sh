#!/bin/bash

# SuriGuard Deployment Script
# Version: 1.0.0

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to log messages
log() {
    echo -e "${GREEN}[DEPLOY] $1${NC}"
}

# Function to log warnings
warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Function to log errors
error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Check prerequisites
check_prerequisites() {
    log "Checking system prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed. Please install Node.js v16 or higher."
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        error "npm is not installed. Please install npm."
    fi
    
    # Check Suricata (optional)
    if ! command -v suricata &> /dev/null; then
        warn "Suricata is not installed. Some features may be limited."
    fi
}

# Install dependencies
install_dependencies() {
    log "Installing project dependencies..."
    npm install || error "Failed to install dependencies"
}

# Build the project
build_project() {
    log "Building the project..."
    npm run build || error "Build process failed"
}

# Initialize database
init_database() {
    log "Initializing database..."
    npm run db:init || warn "Database initialization may have issues"
}

# Start the application
start_application() {
    log "Starting SuriGuard application..."
    npm run dev
}

# Main deployment function
deploy() {
    clear
    echo "SuriGuard Deployment Script"
    echo "=========================="
    
    check_prerequisites
    install_dependencies
    build_project
    init_database
    
    log "Deployment completed successfully!"
    
    read -p "Do you want to start the application? (y/n): " start_app
    
    if [[ $start_app == "y" || $start_app == "Y" ]]; then
        start_application
    else
        log "Application not started. Run 'npm run dev' to start manually."
    fi
}

# Execute deployment
deploy
