@echo off
echo Starting Mayer Briggs Application...
echo.
echo =========================================================
echo  NETWORK ACCESS INFO
echo =========================================================
ipconfig | findstr /i "IPv4"
echo.
echo App will be accessible at http://[YOUR-IP-ADDRESS]:3000
echo.
echo.
echo Please wait while the server starts.
echo Do not close this window while the application is in use.

cd /d "%~dp0"
call npm run start

pause
