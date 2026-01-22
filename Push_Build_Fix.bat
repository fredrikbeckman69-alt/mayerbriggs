@echo off
cd /d "%~dp0"
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "fix: remove spaces in css arbitrary values to fix build"
"C:\Program Files\Git\cmd\git.exe" push
del Push_Build_Fix.bat
