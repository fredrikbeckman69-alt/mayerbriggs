@echo off
cd /d "%~dp0"
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: enhance hover effects with siri glow and scale"
"C:\Program Files\Git\cmd\git.exe" push
del Push_Hover_Fix.bat
