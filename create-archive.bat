@echo off
echo Creating project archive...

powershell -Command "Compress-Archive -Path *.html,*.css,*.js,*.png,*.jpg,*.md,*.json,*.txt -DestinationPath Academus-Landing.zip -Force"

echo.
echo Archive created: Academus-Landing.zip
echo You can now share this file with others!
echo.
pause

