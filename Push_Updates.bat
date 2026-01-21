@echo off
echo Preparing to push changes to repository...
echo.

cd /d "%~dp0"

echo Adding files...
git add .

echo Committing changes...
git commit -m "feat: Add Swedish MBTI descriptions, rich HTML email, and preview page"

echo Pushing to remote...
git push

echo.
echo ========================================
echo Don't forget to check your deployment dashboard if this triggers a build!
echo ========================================
pause
