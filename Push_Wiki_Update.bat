@echo off
echo Preparing to push Wikipedia link update...
cd /d "%~dp0"
git add .
git commit -m "feat: add Wikipedia link to start page"
git push
echo.
echo Done.
pause
