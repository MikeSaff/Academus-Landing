@echo off
echo ======================================
echo   Academus Landing - Netlify Deploy
echo ======================================
echo.
echo This script will deploy your site to Netlify
echo.
echo Prerequisites:
echo 1. Node.js must be installed
echo 2. You need a Netlify account (free at netlify.com)
echo.
pause

echo.
echo Installing Netlify CLI...
call npm install -g netlify-cli

echo.
echo Starting deployment...
echo You will need to:
echo 1. Authorize with Netlify (browser will open)
echo 2. Choose "Create & configure a new site"
echo 3. Select your team
echo 4. Enter site name (e.g., academus-publishing)
echo.
pause

echo.
call netlify deploy --prod

echo.
echo ======================================
echo   Deployment Complete!
echo ======================================
echo.
echo Your site is now live!
echo Copy the URL from above and share it.
echo.
pause

