#!/bin/bash

#############################################
# Kanbino OAuth Verification Script
# This script verifies your OAuth configuration
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

# Counter for issues
ISSUES=0

print_header "OAuth Configuration Verification"

# Check if .env file exists
if [ ! -f .env ]; then
    print_error ".env file not found!"
    print_info "Run 'npm run setup' to create .env files first."
    exit 1
fi

# Source .env file (safely)
print_info "Loading environment variables..."
set -a
source .env
set +a

echo ""

# Check Google OAuth Configuration
print_header "Google OAuth Configuration"

if [ -n "$GOOGLE_CLIENT_ID" ] && [ "$GOOGLE_CLIENT_ID" != "your_google_client_id" ]; then
    print_success "GOOGLE_CLIENT_ID is configured"
else
    print_warning "GOOGLE_CLIENT_ID is not configured"
    ((ISSUES++))
fi

if [ -n "$GOOGLE_CLIENT_SECRET" ] && [ "$GOOGLE_CLIENT_SECRET" != "your_google_client_secret" ]; then
    print_success "GOOGLE_CLIENT_SECRET is configured"
else
    print_warning "GOOGLE_CLIENT_SECRET is not configured"
    ((ISSUES++))
fi

if [ -n "$GOOGLE_CALLBACK_URL" ]; then
    print_success "GOOGLE_CALLBACK_URL is set: $GOOGLE_CALLBACK_URL"

    # Validate callback URL format
    if [[ $GOOGLE_CALLBACK_URL =~ ^https?:// ]]; then
        print_success "GOOGLE_CALLBACK_URL format is valid"
    else
        print_error "GOOGLE_CALLBACK_URL format is invalid (must start with http:// or https://)"
        ((ISSUES++))
    fi

    # Check if callback URL matches current environment
    if [[ $GOOGLE_CALLBACK_URL == *"localhost"* ]]; then
        if [ "$NODE_ENV" == "production" ]; then
            print_warning "GOOGLE_CALLBACK_URL uses localhost in production"
            ((ISSUES++))
        fi
    fi
else
    print_warning "GOOGLE_CALLBACK_URL is not set"
    ((ISSUES++))
fi

echo ""

# Check LinkedIn OAuth Configuration
print_header "LinkedIn OAuth Configuration"

if [ -n "$LINKEDIN_CLIENT_ID" ] && [ "$LINKEDIN_CLIENT_ID" != "your_linkedin_client_id" ]; then
    print_success "LINKEDIN_CLIENT_ID is configured"
else
    print_warning "LINKEDIN_CLIENT_ID is not configured"
    ((ISSUES++))
fi

if [ -n "$LINKEDIN_CLIENT_SECRET" ] && [ "$LINKEDIN_CLIENT_SECRET" != "your_linkedin_client_secret" ]; then
    print_success "LINKEDIN_CLIENT_SECRET is configured"
else
    print_warning "LINKEDIN_CLIENT_SECRET is not configured"
    ((ISSUES++))
fi

if [ -n "$LINKEDIN_CALLBACK_URL" ]; then
    print_success "LINKEDIN_CALLBACK_URL is set: $LINKEDIN_CALLBACK_URL"

    # Validate callback URL format
    if [[ $LINKEDIN_CALLBACK_URL =~ ^https?:// ]]; then
        print_success "LINKEDIN_CALLBACK_URL format is valid"
    else
        print_error "LINKEDIN_CALLBACK_URL format is invalid (must start with http:// or https://)"
        ((ISSUES++))
    fi

    # Check if callback URL matches current environment
    if [[ $LINKEDIN_CALLBACK_URL == *"localhost"* ]]; then
        if [ "$NODE_ENV" == "production" ]; then
            print_warning "LINKEDIN_CALLBACK_URL uses localhost in production"
            ((ISSUES++))
        fi
    fi
else
    print_warning "LINKEDIN_CALLBACK_URL is not set"
    ((ISSUES++))
fi

echo ""

# Check Session Configuration
print_header "Session Configuration"

if [ -n "$SESSION_SECRET" ]; then
    if [ "$SESSION_SECRET" == "your_secure_session_secret_change_in_production" ]; then
        if [ "$NODE_ENV" == "production" ]; then
            print_error "SESSION_SECRET is using default value (INSECURE for production!)"
            ((ISSUES++))
        else
            print_warning "SESSION_SECRET is using default value (change this for production)"
        fi
    else
        # Check if SESSION_SECRET is at least 32 characters
        if [ ${#SESSION_SECRET} -lt 32 ]; then
            print_warning "SESSION_SECRET is short (recommend at least 32 characters)"
            ((ISSUES++))
        else
            print_success "SESSION_SECRET is configured (${#SESSION_SECRET} characters)"
        fi
    fi
else
    print_error "SESSION_SECRET is not set"
    ((ISSUES++))
fi

if [ -n "$SESSION_NAME" ]; then
    print_success "SESSION_NAME is set: $SESSION_NAME"
else
    print_warning "SESSION_NAME is not set (will use default)"
fi

echo ""

# Check if backend is running
print_header "Backend Status"

if command -v curl &> /dev/null; then
    if curl -s http://localhost:3000/health > /dev/null 2>&1; then
        print_success "Backend is running on http://localhost:3000"

        # Check OAuth endpoints
        if curl -s http://localhost:3000/api/auth/status > /dev/null 2>&1; then
            print_success "OAuth status endpoint is accessible"
        else
            print_warning "OAuth status endpoint returned an error"
            ((ISSUES++))
        fi
    else
        print_warning "Backend is not running on http://localhost:3000"
        print_info "Start the backend with: npm run dev"
    fi
else
    print_warning "curl is not installed - skipping backend checks"
fi

echo ""

# Summary
print_header "Verification Summary"

if [ $ISSUES -eq 0 ]; then
    print_success "All checks passed! Your OAuth configuration looks good."
    echo ""
    print_info "You can test the OAuth flow by visiting:"
    if [ -n "$GOOGLE_CLIENT_ID" ] && [ "$GOOGLE_CLIENT_ID" != "your_google_client_id" ]; then
        echo "  • Google: http://localhost:3000/api/auth/google"
    fi
    if [ -n "$LINKEDIN_CLIENT_ID" ] && [ "$LINKEDIN_CLIENT_ID" != "your_linkedin_client_id" ]; then
        echo "  • LinkedIn: http://localhost:3000/api/auth/linkedin"
    fi
    exit 0
else
    print_error "Found $ISSUES issue(s) that need attention."
    echo ""
    print_info "Please review the warnings and errors above."
    print_info "For help, check the Troubleshooting section in README.md"
    exit 1
fi
