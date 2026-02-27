"""
Transform raw_intel.json to curatedNews.json format.

This script converts the scout agent output to the format expected by the frontend.
It tags articles with matched company/product names and sorts by relevance.
"""

import json
import re
from pathlib import Path
from datetime import datetime

# ============================================================================
# COMPANY & PRODUCT LOOKUP
# Derived from the tracked companies in src/data/registries/companies.ts
# and products in src/data/grainTechEntities.ts
# ============================================================================

COMPANY_KEYWORDS = {
    "cgrain": {"names": ["Cgrain", "Cgrain Value", "Cgrain Value Pro"], "id": "cgrain"},
    "foss": {"names": ["FOSS", "EyeFoss", "FOSS Analytics"], "id": "foss"},
    "grainsense": {"names": ["GrainSense"], "id": "grainsense"},
    "videometer": {"names": ["Videometer", "SeedLab", "SeedSorter"], "id": "videometer"},
    "zeutec": {"names": ["Zeutec", "SpectraAlyzer", "Grain Vision AI"], "id": "zeutec"},
    "zoomagri": {"names": ["ZoomAgri", "ZoomBarley"], "id": "zoomagri"},
    "qualysense": {"names": ["QualySense", "QSorter"], "id": "qualysense"},
    "gomicro": {"names": ["GoMicro"], "id": "gomicro"},
    "agsure": {"names": ["AgSure", "Aqsure"], "id": "agsure"},
    "nebulaa": {"names": ["Nebulaa", "MATT Grain Analyser", "MATT Automatic"], "id": "nebulaa"},
    "supergeo": {"names": ["SuperGeo", "SuperGeo AI"], "id": "supergeo"},
    "inarix": {"names": ["Inarix", "PocketLab"], "id": "inarix"},
    "vibe": {"names": ["Vibe Imaging", "Vibe Imaging Analytics", "QM3i"], "id": "vibe"},
    "easyodm": {"names": ["EasyODM"], "id": "easyodm"},
    "cropify": {"names": ["Cropify", "Opal"], "id": "cropify"},
    "deimos": {"names": ["Deimos Laboratory", "Deimos"], "id": "deimos"},
    "ground_truth": {"names": ["Ground Truth Ag", "Ground Truth"], "id": "ground_truth"},
    "upjao": {"names": ["Upjao"], "id": "upjao"},
    "grainkart": {"names": ["Grainkart", "GrainScope AI", "GrainScope"], "id": "grainkart"},
    "keyetech": {"names": ["Keyetech"], "id": "keyetech"},
    "grain_discovery": {"names": ["Grain Discovery"], "id": "grain_discovery"},
    "platypus": {"names": ["Platypus Vision", "Indyn"], "id": "platypus_vision"},
    "hongsheng": {"names": ["Shandong Hongsheng", "Hongsheng"], "id": "hongsheng"},
}

# Technology terms that indicate grain-tech relevance
# Negative keywords — articles about these topics are not relevant to grain-tech
NEGATIVE_KEYWORDS = [
    "shrimp farming", "aquaculture", "precision fermentation", "cultivated meat",
    "seed funding", "seed round", "series a", "series b", "raises $",
    "cow-free cheese", "mycelium", "postbiotic", "synthetic biology",
    "crypto", "blockchain", "nft", "metaverse",
    "dairy farming", "property sale", "real estate",
    "stock price", "commodity futures",
    # Observed noise from Google Alerts
    "india and israel", "india, israel", "india-israel", "modi in israel",
    "mous on agriculture", "strategic partnership",
    "ai agents marketplace", "genai inference", "language model",
    "aquaculture laboratories", "reinforcement learning",
    "selfish behavior", "digital employee", "trolling your feed",
    "israel sign", "deepen ties", "labour mobility",
    "accounting | cfo", "fpga platform",
]

TECH_KEYWORDS = [
    "grain grading", "grain quality", "grain inspection", "grain sorting",
    "grain analyzer", "grain analysis", "grain testing",
    "wheat testing", "barley testing", "kernel analysis",
    "NIR analysis", "NIR spectroscopy", "near-infrared",
    "machine vision grain", "machine vision seed",
    "cereal inspection", "seed analysis", "seed sorting",
    "hyperspectral imaging", "spectral imaging",
    "mycotoxin detection", "moisture testing", "protein content",
    "grain grader", "grain classification",
    "Canadian Grain Commission", "CGC",
]

# Grain industry keywords that indicate moderate relevance
GRAIN_INDUSTRY_KEYWORDS = [
    "wheat", "barley", "oats", "canola", "grain trade", "grain market",
    "grain export", "grain storage", "grain handling", "harvest quality",
    "crop quality", "milling", "grain elevator", "grain terminal",
    "agriculture technology", "agtech", "ag-tech", "precision agriculture",
    "autonomous farming", "farm robot", "crop sensor",
]


def find_company_tags(text: str) -> list:
    """Find which tracked companies are mentioned in the text."""
    tags = []
    text_lower = text.lower()
    for key, info in COMPANY_KEYWORDS.items():
        for name in info["names"]:
            if name.lower() in text_lower:
                if info["id"] not in tags:
                    tags.append(info["id"])
                break
    return tags


def clean_html(text: str) -> str:
    """Strip HTML tags from text."""
    return re.sub(r'<[^>]+>', '', text)


def calculate_relevance(article: dict) -> int:
    """Calculate a relevance score for sorting. Higher = more relevant."""
    score = 0
    raw_text = f"{article.get('title', '')} {article.get('summary', '')}"
    text = clean_html(raw_text).lower()
    source = article.get('source', '').lower()

    # Company name match: +50
    for key, info in COMPANY_KEYWORDS.items():
        for name in info["names"]:
            if name.lower() in text:
                score += 50
                break

    # Technology keyword match: +20 each (cap at 60)
    tech_score = 0
    for kw in TECH_KEYWORDS:
        if kw.lower() in text:
            tech_score += 20
    score += min(tech_score, 60)

    # Grain industry keyword match: +5 each (cap at 20)
    grain_score = 0
    for kw in GRAIN_INDUSTRY_KEYWORDS:
        if kw.lower() in text:
            grain_score += 5
    score += min(grain_score, 20)

    # Category bonus: company feeds get a boost
    category = article.get('category', '')
    if category == 'company':
        score += 10

    # Source-based base score: known grain industry sources are inherently relevant
    GRAIN_SOURCES = [
        'grain central', 'grainswest', 'ground truth ag', 'future farming',
        'world grain', 'canadian grain commission', 'protein industries',
        'farm forum', 'grain trade australia',
    ]
    for gs in GRAIN_SOURCES:
        if gs in source:
            score += 3
            break

    # Source bonus: direct company feeds
    for key, info in COMPANY_KEYWORDS.items():
        for name in info["names"]:
            if name.lower() in source:
                score += 30
                break

    # Negative keywords: penalize clearly irrelevant content
    for neg in NEGATIVE_KEYWORDS:
        if neg.lower() in text:
            score -= 10

    return max(score, 0)  # Floor at 0


def clean_summary(summary: str) -> str:
    """Strip HTML tags and clean up summary text."""
    # Remove HTML tags
    clean = re.sub(r'<[^>]+>', '', summary)
    # Normalize whitespace
    clean = ' '.join(clean.split())
    # Remove "The post ... appeared first on ..." suffixes
    clean = re.sub(r'\s*The post\s.*$', '', clean, flags=re.IGNORECASE)
    return clean.strip()


def transform():
    # Paths - script is at scripts/scraper/src/transform_to_curated.py
    # Project root is at ../../.. from this file
    script_dir = Path(__file__).resolve().parent  # src/
    project_root = script_dir.parent.parent.parent  # graintech-dashboard/
    raw_intel_path = project_root / 'src' / 'data' / 'raw_intel.json'
    curated_path = project_root / 'src' / 'data' / 'curatedNews.json'
    
    print(f"Reading from: {raw_intel_path}")
    print(f"Writing to: {curated_path}")
    
    if not raw_intel_path.exists():
        print("No raw_intel.json found, skipping transform")
        return
        
    with open(raw_intel_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    
    articles = raw_data.get('articles', [])
    print(f"Total raw articles: {len(articles)}")
    
    # Deduplicate by normalized title
    seen_titles = set()
    unique_articles = []
    for article in articles:
        title_norm = clean_html(article.get('title', '')).strip().lower()
        if title_norm and title_norm not in seen_titles:
            seen_titles.add(title_norm)
            unique_articles.append(article)
    print(f"After dedup: {len(unique_articles)} unique articles (removed {len(articles) - len(unique_articles)} duplicates)")
    articles = unique_articles
    
    # Tag and score each article
    scored = []
    for article in articles:
        text = clean_html(f"{article.get('title', '')} {article.get('summary', '')}")
        company_tags = find_company_tags(text)
        relevance = calculate_relevance(article)
        
        scored.append({
            **article,
            'company_tags': company_tags,
            'relevance': relevance,
        })
    
    # Filter out zero-relevance articles (clearly irrelevant)
    scored = [a for a in scored if a.get('relevance', 0) > 0]
    print(f"After relevance filter: {len(scored)} articles (removed {len(articles) - len(scored)} with score 0)")
    
    # Sort by relevance (descending), then by date (newest first)
    scored.sort(key=lambda x: (
        x.get('relevance', 0),
        x.get('published', ''),
    ), reverse=True)
    
    # Log top articles for debugging
    print(f"\nTop 10 by relevance:")
    for i, a in enumerate(scored[:10]):
        print(f"  {i+1}. [{a['relevance']}] {clean_html(a.get('title', ''))[:60]}... tags={a['company_tags']}")
    
    # Transform to curatedNews format (limit to 25)
    curated = []
    for i, article in enumerate(scored[:25]):
        summary = article.get('summary', '')
        summary = clean_summary(summary)
        
        curated.append({
            "id": str(i + 1),
            "title": clean_html(article.get('title', 'Untitled')),
            "source": article.get('source', 'Unknown'),
            "date": article.get('published', datetime.now().isoformat())[:10],  # YYYY-MM-DD
            "summary": summary[:200],
            "url": article.get('link', ''),
            "category": article.get('category', 'industry'),
            "companyTags": article.get('company_tags', []),
        })
    
    # Write curated news
    with open(curated_path, 'w', encoding='utf-8') as f:
        json.dump(curated, f, indent=2, ensure_ascii=False)
    
    # Stats
    tagged = sum(1 for a in curated if a.get('companyTags'))
    print(f"\nTransformed {len(curated)} articles to curatedNews.json")
    print(f"  Company-tagged articles: {tagged}/{len(curated)}")

if __name__ == '__main__':
    transform()
