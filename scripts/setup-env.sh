#!/bin/bash

#############################################
# Kanbino Environment Setup Script
# This script helps you set up your .env files
#############################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if .env.example exists
if [ ! -f .env.example ]; then
    print_error ".env.example not found!"
    print_info "Please run this script from the project root directory."
    exit 1
fi

# Check if .env already exists
if [ -f .env ]; then
    print_warning ".env file already exists."
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Keeping existing .env file."
        exit 0
    fi
    print_warning "Backing up existing .env to .env.backup..."
    cp .env .env.backup
fi

# Copy .env.example to .env
print_header "Creating Backend .env File"
cp .env.example .env
print_success "Created .env file"

# Check if frontend .env.example exists
if [ -f frontend/.env.example ]; then
    if [ -f frontend/.env.development ]; then
        print_warning "frontend/.env.development already exists."
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Keeping existing frontend/.env.development file."
        else
            print_warning "Backing up existing frontend/.env.development to frontend/.env.development.backup..."
            cp frontend/.env.development frontend/.env.development.backup
            cp frontend/.env.example frontend/.env.development
            print_success "Updated frontend/.env.development file"
        fi
    else
        cp frontend/.env.example frontend/.env.development
        print_success "Created frontend/.env.development file"
    fi
fi

print_header "Environment Setup Complete!"
print_success "✓ Backend .env file created/updated"
print_success "✓ Frontend .env.development file created/updated"

echo ""
print_info "Next steps:"
echo "  1. Edit .env and add your OAuth credentials (optional)"
echo "  2. Generate a secure SESSION_SECRET for production:"
echo "     npm run generate:secret"
echo "  3. Start the development server:"
echo "     npm run dev:all"
echo ""
print_warning "IMPORTANT: Never commit .env files to version control!"
echo ""
