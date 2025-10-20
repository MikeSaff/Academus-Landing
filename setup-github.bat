@echo off
echo ========================================
echo   Academus Landing - GitHub Setup
echo ========================================
echo.
echo This script will help you upload the project to GitHub
echo.
echo Your GitHub username: MikeSaff
echo Suggested repository name: Academus-Landing
echo.
pause

echo.
echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: Academus Publishing landing page"

echo.
echo ========================================
echo   MANUAL STEPS REQUIRED
echo ========================================
echo.
echo Please follow these steps:
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: Academus-Landing
echo 3. Description: Landing page for Academus Publishing
echo 4. Keep it PUBLIC (required for free GitHub Pages)
echo 5. DO NOT add README, .gitignore, or license
echo 6. Click "Create repository"
echo.
echo 7. Then come back here and press any key...
echo.
pause

echo.
echo Step 4: Adding remote repository...
git remote add origin https://github.com/MikeSaff/Academus-Landing.git

echo.
echo Step 5: Renaming branch to main...
git branch -M main

echo.
echo Step 6: Pushing to GitHub...
echo (You may need to enter your GitHub credentials)
git push -u origin main

echo.
echo ========================================
echo   SUCCESS! Code uploaded to GitHub
echo ========================================
echo.
echo Now let's enable GitHub Pages...
echo.
echo Go to: https://github.com/MikeSaff/Academus-Landing/settings/pages
echo.
echo Configure:
echo 1. Source: Deploy from a branch
echo 2. Branch: main
echo 3. Folder: / (root)
echo 4. Click Save
echo.
echo Your site will be available at:
echo https://mikesaff.github.io/Academus-Landing/
echo.
echo (It may take a few minutes to deploy)
echo.
pause

