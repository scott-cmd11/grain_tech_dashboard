@echo off
REM GrainTech News Feed Update Script
REM This script fetches the latest news and updates curatedNews.json

echo ============================================
echo GrainTech News Feed Update
echo Started at: %date% %time%
echo ============================================

cd /d "%~dp0"

REM Activate virtual environment if it exists
if exist "scripts\scraper\venv\Scripts\activate.bat" (
    call scripts\scraper\venv\Scripts\activate.bat
)

REM Run the scout agent to fetch news
echo.
echo [1/2] Running Scout Agent...
cd scripts\scraper
python -m src.agents.scout
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Scout agent failed
    exit /b 1
)

REM Transform to curated format
echo.
echo [2/2] Transforming to curated format...
python src\transform_to_curated.py
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Transform failed
    exit /b 1
)

echo.
echo ============================================
echo News feed update complete!
echo Finished at: %date% %time%
echo ============================================
