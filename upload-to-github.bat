@echo off
echo ========================================
echo   Uploading to GitHub
echo ========================================
echo.

echo Adding remote repository...
git remote add origin https://github.com/MikeSaff/Academus-Landing.git

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Pushing to GitHub...
echo (You may need to authenticate)
git push -u origin main

echo.
echo ========================================
echo   SUCCESS! Code uploaded!
echo ========================================
echo.
echo Now enable GitHub Pages:
echo 1. Open: https://github.com/MikeSaff/Academus-Landing/settings/pages
echo 2. Source: Deploy from a branch
echo 3. Branch: main, Folder: / (root)
echo 4. Click Save
echo.
echo Your site will be live at:
echo https://mikesaff.github.io/Academus-Landing/
echo.
pause

start https://github.com/MikeSaff/Academus-Landing/settings/pages


