@echo off
echo ========================================
echo   Academus Publishing Landing Server
echo ========================================
echo.
echo Starting local development server...
echo.
echo The site will be available at:
echo   http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Try Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python...
    python -m http.server 8000
    goto :end
)

REM Try Python (if python3 command doesn't exist on Windows)
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python...
    py -m http.server 8000
    goto :end
)

REM Try PHP
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using PHP...
    php -S localhost:8000
    goto :end
)

REM Try Node.js http-server
where node >nul 2>&1
if %errorlevel% == 0 (
    echo Using Node.js...
    echo Installing http-server if needed...
    call npx -y http-server -p 8000
    goto :end
)

echo ERROR: No suitable server found!
echo Please install one of the following:
echo   - Python 3: https://www.python.org/
echo   - PHP: https://www.php.net/
echo   - Node.js: https://nodejs.org/
echo.
pause

:end


