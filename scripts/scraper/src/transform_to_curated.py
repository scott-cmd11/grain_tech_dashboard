"""
Transform raw_intel.json to curatedNews.json format.

This script converts the scout agent output to the format expected by the frontend.
"""

import json
from pathlib import Path
from datetime import datetime

def transform():
    # Paths
    script_dir = Path(__file__).resolve().parent.parent.parent
    raw_intel_path = script_dir.parent.parent / 'src' / 'data' / 'raw_intel.json'
    curated_path = script_dir.parent.parent / 'src' / 'data' / 'curatedNews.json'
    
    print(f"Reading from: {raw_intel_path}")
    print(f"Writing to: {curated_path}")
    
    if not raw_intel_path.exists():
        print("No raw_intel.json found, skipping transform")
        return
        
    with open(raw_intel_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    
    articles = raw_data.get('articles', [])
    
    # Transform to curatedNews format
    curated = []
    for i, article in enumerate(articles[:20]):  # Limit to 20 articles
        curated.append({
            "id": str(i + 1),
            "title": article.get('title', 'Untitled'),
            "source": article.get('source', 'Unknown'),
            "date": article.get('published', datetime.now().isoformat())[:10],  # YYYY-MM-DD
            "summary": article.get('summary', '')[:200],  # Truncate summary
            "url": article.get('link', ''),
            "category": article.get('category', 'industry')
        })
    
    # Write curated news
    with open(curated_path, 'w', encoding='utf-8') as f:
        json.dump(curated, f, indent=2, ensure_ascii=False)
    
    print(f"Transformed {len(curated)} articles to curatedNews.json")

if __name__ == '__main__':
    transform()
