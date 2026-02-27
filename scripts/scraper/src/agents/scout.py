"""
Scout Agent - The Ingestion Engine for the AI This Week Newsletter.

This agent traverses the information landscape, collecting raw intelligence
from a curated SOURCE_MAP and outputting it to data/raw_intel.json.

Usage:
    python -m src.agents.scout
"""

import json
import logging
import feedparser
import requests
import time
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Any, Optional
from dateutil import parser as date_parser

# Import new scraper modules
from src.sources.csv_ingest import load_alerts_csv
from src.sources.search_scraper import SearchScraper
from src.sources.web_scraper import WebScraper

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ============================================================================
# SOURCE_MAP: Grain Industry Sources
# ============================================================================
# Each category maps to a list of sources with their URL and type (rss/scrape).

SOURCE_MAP = {
    'grain_industry': [
        {
            'name': 'GrainsWest Magazine',
            'url': 'https://grainswest.com/feed/',
            'type': 'rss'
        },
        {
            'name': 'Grain Central',
            'url': 'https://www.graincentral.com/feed/',
            'type': 'rss'
        },
        {
            'name': 'University of Saskatchewan - Agriculture',
            'url': 'https://usask.technologypublisher.com/rssDataFeed.aspx?category=agriculture+and+bioresources',
            'type': 'rss'
        },
    ],
    'technology': [
        {
            'name': 'Ag Funder News',
            'url': 'https://agfundernews.com/feed',
            'type': 'rss'
        },
        {
            'name': 'Future Farming',
            'url': 'https://www.futurefarming.com/feed/',
            'type': 'rss'
        },
    ],
    'company': [
        {
            'name': 'Protein Industries Canada',
            'url': 'https://www.proteinindustriescanada.ca/news-releases',
            'type': 'scrape'
        },
        {
            'name': 'Ground Truth Ag',
            'url': 'https://groundtruth.ag/',
            'type': 'scrape'
        },
    ],
    'regulatory': [
        # Government and regulatory sources
    ],
}


def fetch_rss_feed(url: str, source_name: str, category: str, max_age_days: int = 7) -> List[Dict[str, Any]]:
    """
    Fetch and parse an RSS feed.

    Args:
        url: The RSS feed URL.
        source_name: Human-readable name of the source.
        category: The category tag for these items (e.g., 'vertical_grain').
        max_age_days: Only include items published within this many days.

    Returns:
        List of article dictionaries.
    """
    articles = []
    cutoff_date = datetime.now() - timedelta(days=max_age_days)

    try:
        logger.info(f"Fetching RSS: {source_name} ({url})")
        feed = feedparser.parse(url)

        if feed.bozo:
            logger.warning(f"Feed parsing issue for {source_name}: {feed.bozo_exception}")

        for entry in feed.entries:
            # Parse publication date
            published = None
            if hasattr(entry, 'published'):
                try:
                    published = date_parser.parse(entry.published)
                except Exception:
                    published = datetime.now()
            elif hasattr(entry, 'updated'):
                try:
                    published = date_parser.parse(entry.updated)
                except Exception:
                    published = datetime.now()
            else:
                published = datetime.now()

            # Filter by age
            if published.replace(tzinfo=None) < cutoff_date:
                continue

            # Extract summary (handle arXiv abstracts)
            summary = ''
            if hasattr(entry, 'summary'):
                summary = entry.summary
            elif hasattr(entry, 'description'):
                summary = entry.description

            # Clean up title (remove newlines for arXiv)
            title = entry.get('title', 'Untitled')
            title = ' '.join(title.split())

            articles.append({
                'title': title,
                'link': entry.get('link', ''),
                'summary': summary[:500] if summary else '',  # Truncate long summaries
                'published': published.isoformat(),
                'source': source_name,
                'category': category,
            })

        logger.info(f"  -> Found {len(articles)} recent items from {source_name}")

    except requests.exceptions.RequestException as e:
        logger.error(f"Network error fetching {source_name}: {e}")
    except Exception as e:
        logger.error(f"Error fetching {source_name}: {e}")

    return articles


def scrape_protein_industries_canada() -> List[Dict[str, Any]]:
    """
    Scrape news releases from Protein Industries Canada.
    """
    articles = []
    url = 'https://www.proteinindustriescanada.ca/news-releases'

    try:
        logger.info(f"Scraping: Protein Industries Canada ({url})")
        response = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        # Find news items (adjust selectors based on actual site structure)
        news_items = soup.select('article.news-item, div.news-release, a.news-link')[:5]

        for item in news_items:
            title_elem = item.select_one('h2, h3, .title')
            link_elem = item if item.name == 'a' else item.select_one('a')

            if title_elem and link_elem:
                articles.append({
                    'title': title_elem.get_text(strip=True),
                    'link': link_elem.get('href', ''),
                    'summary': '',
                    'published': datetime.now().isoformat(),
                    'source': 'Protein Industries Canada',
                    'category': 'vertical_grain',
                })

        logger.info(f"  -> Found {len(articles)} items from Protein Industries Canada")

    except requests.exceptions.RequestException as e:
        logger.error(f"Network error scraping Protein Industries Canada: {e}")
    except Exception as e:
        logger.error(f"Error scraping Protein Industries Canada: {e}")

    return articles


def scrape_ground_truth_ag() -> List[Dict[str, Any]]:
    """
    Scrape the latest news from Ground Truth Ag.
    """
    articles = []
    url = 'https://groundtruth.ag/'

    try:
        logger.info(f"Scraping: Ground Truth Ag ({url})")
        response = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        # Look for news or blog sections (adjust selectors)
        news_items = soup.select('article, .news-item, .blog-post, section.content a')[:3]

        for item in news_items:
            title_elem = item.select_one('h1, h2, h3, .title')
            link_elem = item if item.name == 'a' else item.select_one('a')

            if title_elem:
                link = ''
                if link_elem:
                    link = link_elem.get('href', '')
                    if link and not link.startswith('http'):
                        link = f"https://groundtruth.ag{link}"

                articles.append({
                    'title': title_elem.get_text(strip=True),
                    'link': link,
                    'summary': '',
                    'published': datetime.now().isoformat(),
                    'source': 'Ground Truth Ag',
                    'category': 'vertical_grain',
                })

        logger.info(f"  -> Found {len(articles)} items from Ground Truth Ag")

    except requests.exceptions.RequestException as e:
        logger.error(f"Network error scraping Ground Truth Ag: {e}")
    except Exception as e:
        logger.error(f"Error scraping Ground Truth Ag: {e}")

    return articles


def load_sources_config() -> Dict[str, Any]:
    """Load sources configuration from YAML file."""
    # Assuming this script is running from scripts/scraper/src/agents/scout.py
    # and config is at scripts/scraper/config/sources.yaml
    config_path = Path(__file__).resolve().parents[2] / 'config' / 'sources.yaml'
    
    if not config_path.exists():
        logger.warning(f"Config file not found: {config_path}")
        return {}
    
    try:
        import yaml
        with open(config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f) or {}
    except Exception as e:
        logger.error(f"Error loading config: {e}")
        return {}


def run_scout() -> Dict[str, Any]:
    """
    Execute the Scout agent: fetch all sources and aggregate results.

    Returns:
        Dictionary with raw intelligence data.
    """
    all_articles = []
    category_counts = {}

    logger.info("=" * 60)
    logger.info("🔍 SCOUT AGENT: Starting Intelligence Gathering")
    logger.info("=" * 60)

    # Process each category in SOURCE_MAP
    for category, sources in SOURCE_MAP.items():
        category_counts[category] = 0

        for source in sources:
            if source['type'] == 'rss':
                articles = fetch_rss_feed(
                    url=source['url'],
                    source_name=source['name'],
                    category=category
                )
                all_articles.extend(articles)
                category_counts[category] += len(articles)

            elif source['type'] == 'scrape':
                # Handle specific scrapers
                if 'proteinindustriescanada' in source['url']:
                    articles = scrape_protein_industries_canada()
                elif 'groundtruth' in source['url']:
                    articles = scrape_ground_truth_ag()
                else:
                    logger.warning(f"No scraper implemented for: {source['name']}")
                    articles = []

                all_articles.extend(articles)
                category_counts[category] += len(articles)

    # =========================================================================
    # GOOGLE ALERTS: Load from sources.yaml config
    # =========================================================================
    # =========================================================================
    # CSV SCRAPER: Load from google_alerts_all_utf8.csv
    # =========================================================================
    logger.info("loading sources config...")
    config = load_sources_config()
    scraper_config = config.get('scraper', {})
    csv_path_str = scraper_config.get('csv_source_path')
    
    logger.info(f"DEBUG: Scraper Config: {scraper_config}")
    
    if scraper_config.get('enabled', True) and csv_path_str:
        logger.info("-" * 60)
        logger.info("🕵️ CSV SCRAPER: Starting search run")
        logger.info("-" * 60)
        
        # Resolve path relative to scraper root (scripts/scraper)
        scraper_root = Path(__file__).resolve().parents[2]
        csv_path = scraper_root / csv_path_str
        
        queries = load_alerts_csv(csv_path)
        
        if queries:
            search_engine = SearchScraper()
            web_fetcher = WebScraper()
            category_counts['csv_scraper'] = 0
            
            # Rate limiting / Batching could be added here
            max_results = scraper_config.get('max_search_results', 5)
            scrape_full = scraper_config.get('scrape_full_content', True)
            
            logger.info(f"Processing {len(queries)} queries from CSV...")
            
            for i, q in enumerate(queries):
                # Progress log every 5 queries
                if i % 5 == 0:
                    logger.info(f"  -> Processing query {i+1}/{len(queries)}: {q.title}")
                
                # Search
                results = search_engine.search(q.query, num_results=max_results)
                
                for res in results:
                    # Enrich with full content if requested
                    if scrape_full and res.get('link'):
                        # Basic content fetch to get better summary
                        # Start with existing summary in case fetch fails
                        full_content = web_fetcher.scrape_url(res['link'])
                        if full_content and full_content.get('summary'):
                            # Update summary with scraped content if it's better/longer
                            if len(full_content['summary']) > len(res['summary']):
                                res['summary'] = full_content['summary']
                                # Could also update title if needed, but search result title is usually good
                    
                    # Add metadata
                    res['source'] = f"Scraper: {q.title}" # Attribution
                    res['category'] = q.section # Use section as category group
                    
                    all_articles.append(res)
                    category_counts['csv_scraper'] += 1
                
                # Polite delay between queries (search_scraper handles internal delay too, but extra safety)
                time.sleep(1)

            logger.info(f"  -> Total from CSV Search Scraper: {category_counts['csv_scraper']} items")
        else:
            logger.warning("No queries found in CSV.")
            
    # =========================================================================
    # COMPANY FEEDS: Direct RSS from tracked grain-tech companies
    # =========================================================================
    company_feeds = config.get('company_feeds', [])
    
    if company_feeds:
        logger.info("-" * 60)
        logger.info("🏢 COMPANY FEEDS: Fetching from tracked companies")
        logger.info("-" * 60)
        category_counts['company_feeds'] = 0
        
        for feed in company_feeds:
            feed_name = feed.get('name', 'Unknown Company')
            feed_url = feed.get('url', '')
            feed_category = feed.get('category', 'company')
            
            if feed_url:
                articles = fetch_rss_feed(
                    url=feed_url,
                    source_name=feed_name,
                    category=feed_category
                )
                all_articles.extend(articles)
                category_counts['company_feeds'] += len(articles)
        
        logger.info(f"  -> Total from Company Feeds: {category_counts['company_feeds']} items")

    # =========================================================================
    # GOOGLE ALERTS: Grain-tech specific search alerts
    # =========================================================================
    google_alerts = config.get('google_alerts', [])
    
    if google_alerts:
        logger.info("-" * 60)
        logger.info("🔔 GOOGLE ALERTS: Fetching grain-tech alerts")
        logger.info("-" * 60)
        category_counts['google_alerts'] = 0
        
        for alert in google_alerts:
            alert_name = alert.get('name', 'Unknown Alert')
            alert_url = alert.get('url', '')
            alert_category = alert.get('category', 'technology')
            
            if alert_url:
                articles = fetch_rss_feed(
                    url=alert_url,
                    source_name=f"Google Alert: {alert_name}",
                    category=alert_category
                )
                all_articles.extend(articles)
                category_counts['google_alerts'] += len(articles)
        
        logger.info(f"  -> Total from Google Alerts: {category_counts['google_alerts']} items")

    # =========================================================================
    # ADDITIONAL RSS FEEDS: Load from sources.yaml config
    # =========================================================================
    rss_feeds = config.get('rss_feeds', [])
    
    if rss_feeds:
        logger.info("-" * 60)
        logger.info("📡 ADDITIONAL RSS: Fetching configured feeds")
        logger.info("-" * 60)
        category_counts['rss_feeds'] = 0
        
        for feed in rss_feeds:
            feed_name = feed.get('name', 'Unknown Feed')
            feed_url = feed.get('url', '')
            feed_category = feed.get('category', 'headline')
            
            if feed_url:
                articles = fetch_rss_feed(
                    url=feed_url,
                    source_name=feed_name,
                    category=feed_category
                )
                all_articles.extend(articles)
                category_counts['rss_feeds'] += len(articles)
        
        logger.info(f"  -> Total from RSS Feeds: {category_counts['rss_feeds']} items")

    # Build the report
    report = {
        'generated_at': datetime.now().isoformat(),
        'total_items': len(all_articles),
        'category_counts': category_counts,
        'articles': all_articles,
    }

    logger.info("=" * 60)
    logger.info("📊 SCOUT REPORT:")
    for cat, count in category_counts.items():
        logger.info(f"   {cat}: {count} items")
    logger.info(f"   TOTAL: {len(all_articles)} items")
    logger.info("=" * 60)

    return report


def save_raw_intel(report: Dict[str, Any], output_path: Optional[Path] = None) -> Path:
    """
    Save the raw intelligence report to JSON.
    """
    if output_path is None:
        # Save to graintech-dashboard/src/data/raw_intel.json
        # Running from scripts/scraper/src/agents/scout.py
        # root is parents[4]
        output_path = Path(__file__).resolve().parents[4] / 'src' / 'data' / 'raw_intel.json'

    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    logger.info(f"💾 Raw intelligence saved to: {output_path}")
    return output_path


def main():
    """Main entry point for the Scout agent."""
    report = run_scout()
    save_raw_intel(report)


if __name__ == '__main__':
    main()
