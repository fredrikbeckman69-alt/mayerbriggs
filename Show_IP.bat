@echo off
echo =========================================================
echo  MBTI App Network Address
echo =========================================================
echo.
echo To easier access the app from other computers, use one of the IPs below:
echo.
ipconfig | findstr /i "IPv4"
echo.
echo Example URL: http://[YOUR-IP-ADDRESS]:3000
echo.
pause
