---
description: How to update the GrainTech news feed
---

# Update News Feed

This workflow fetches the latest grain industry news from configured RSS feeds and updates the `curatedNews.json` file used by the dashboard.

## Quick Run (Manual)

// turbo
1. Run the news update batch script:
```powershell
.\update-news.bat
```

## Step-by-Step (Manual)

If you need to run the steps separately:

// turbo
1. Navigate to the scraper directory:
```powershell
cd scripts\scraper
```

// turbo
2. Run the scout agent to fetch news:
```powershell
python -m src.agents.scout
```

// turbo
3. Transform to curated format:
```powershell
python src\transform_to_curated.py
```

## Schedule Daily Updates (Windows Task Scheduler)

To automate daily news updates:

1. Open Task Scheduler:
```powershell
taskschd.msc
```

2. Create a new task:
   - **Name**: GrainTech News Update
   - **Trigger**: Daily at 6:00 AM (or your preferred time)
   - **Action**: Start a program
   - **Program/script**: `C:\Users\scott\coding projects\graintech-dashboard\update-news.bat`
   - **Start in**: `C:\Users\scott\coding projects\graintech-dashboard`

3. Enable "Run whether user is logged on or not" for unattended execution

## Troubleshooting

- **No articles found**: Check if RSS feeds are accessible in `scout.py` SOURCE_MAP
- **Transform fails**: Ensure `raw_intel.json` exists in `src/data/`
- **Python not found**: Activate the venv: `scripts\scraper\venv\Scripts\activate`

## Files Involved

- `scripts/scraper/src/agents/scout.py` - Fetches news from RSS feeds
- `scripts/scraper/src/transform_to_curated.py` - Converts to frontend format
- `src/data/raw_intel.json` - Raw scraped articles
- `src/data/curatedNews.json` - Final curated news for dashboard
