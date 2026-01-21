@echo off
echo Starting Mayer Briggs Application in DEVELOPMENT MODE...
echo.
echo =========================================================
echo  Changes to code will be visible immediately
echo =========================================================
echo.
echo App will be accessible at http://localhost:3000
echo.
echo Please wait while the development server starts...
echo.

cd /d "%~dp0"
call npm run dev

pause
