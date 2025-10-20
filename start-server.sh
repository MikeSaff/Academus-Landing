#!/bin/bash

echo "========================================"
echo "  Academus Publishing Landing Server"
echo "========================================"
echo ""
echo "Starting local development server..."
echo ""
echo "The site will be available at:"
echo "  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

# Try Python 3
if command -v python3 &> /dev/null; then
    echo "Using Python 3..."
    python3 -m http.server 8000
    exit 0
fi

# Try Python
if command -v python &> /dev/null; then
    echo "Using Python..."
    python -m http.server 8000
    exit 0
fi

# Try PHP
if command -v php &> /dev/null; then
    echo "Using PHP..."
    php -S localhost:8000
    exit 0
fi

# Try Node.js http-server
if command -v node &> /dev/null; then
    echo "Using Node.js..."
    echo "Installing http-server if needed..."
    npx -y http-server -p 8000
    exit 0
fi

# No server found
echo "ERROR: No suitable server found!"
echo "Please install one of the following:"
echo "  - Python 3: https://www.python.org/"
echo "  - PHP: https://www.php.net/"
echo "  - Node.js: https://nodejs.org/"
echo ""
exit 1


