#!/bin/bash

#############################################
# Kanbino Session Secret Generator
# This script generates a secure random session secret
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

print_header "Session Secret Generator"

# Method 1: OpenSSL (preferred)
if command -v openssl &> /dev/null; then
    print_info "Generating secure random string using OpenSSL..."
    SECRET=$(openssl rand -base64 32)
    print_success "Generated using OpenSSL"
# Method 2: Node.js
elif command -v node &> /dev/null; then
    print_info "OpenSSL not found, using Node.js..."
    SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
    print_success "Generated using Node.js"
# Method 3: /dev/urandom
else
    print_info "OpenSSL and Node.js not found, using /dev/urandom..."
    SECRET=$(head -c 32 /dev/urandom | base64)
    print_success "Generated using /dev/urandom"
fi

echo ""
print_header "Generated Secret"
echo ""
echo -e "${GREEN}$SECRET${NC}"
echo ""

# Ask if user wants to update .env file
read -p "Do you want to update your .env file with this secret? (y/N): " -n 1 -r
echo
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ ! -f .env ]; then
        print_error ".env file not found!"
        print_info "Run 'npm run setup' to create .env file first."
        exit 1
    fi

    # Backup existing .env
    if [ -f .env ]; then
        cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
        print_success "Backed up existing .env file"
    fi

    # Update or add SESSION_SECRET
    if grep -q "^SESSION_SECRET=" .env; then
        # Replace existing SESSION_SECRET
        sed -i "s/^SESSION_SECRET=.*/SESSION_SECRET=$SECRET/" .env
        print_success "Updated SESSION_SECRET in .env"
    else
        # Append SESSION_SECRET to .env
        echo "" >> .env
        echo "# Session Configuration" >> .env
        echo "SESSION_SECRET=$SECRET" >> .env
        print_success "Added SESSION_SECRET to .env"
    fi

    echo ""
    print_success "Session secret has been updated in .env file"
    print_warning "Remember to restart your server to use the new secret!"
else
    echo ""
    print_info "Secret not updated in .env file"
    print_info "You can manually add it to your .env:"
    echo ""
    echo -e "${GREEN}SESSION_SECRET=$SECRET${NC}"
    echo ""
fi

echo ""
print_header "Security Best Practices"
echo ""
print_warning "• Keep your SESSION_SECRET confidential"
print_warning "• Never commit .env files to version control"
print_warning "• Use different secrets for development, staging, and production"
print_warning "• Rotate your session secret periodically (recommended: every 90 days)"
print_warning "• After rotating, all existing sessions will be invalidated"
echo ""
