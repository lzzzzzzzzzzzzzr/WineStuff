@echo off
cd /d "%~dp0"
bun --hot client/index.html
pause