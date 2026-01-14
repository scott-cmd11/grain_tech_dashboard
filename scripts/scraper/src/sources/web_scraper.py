"""
Generic Web Scraper Module

Fetches and extracts content from direct URLs using BeautifulSoup.
"""

import logging
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class WebScraper:
    """Generic web scraper using BeautifulSoup."""
    
    def __init__(self, timeout: int = 15):
        self.timeout = timeout
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5'
        }

    def scrape_url(self, url: str) -> Optional[Dict[str, Any]]:
        """
        Fetch and parse a single URL.
        
        Args:
            url: The URL to scrape.
            
        Returns:
            Dictionary with title, summary, etc., or None if failed.
        """
        try:
            logger.info(f"Scraping direct URL: {url}")
            response = requests.get(url, headers=self.headers, timeout=self.timeout)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract Title
            title_tag = soup.find('h1') or soup.find('title')
            title = title_tag.get_text(strip=True) if title_tag else "No Title"
            
            # Extract Meta Description or First Paragraph for Summary
            summary = ""
            meta_desc = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
            if meta_desc:
                summary = meta_desc.get('content', '').strip()
            
            if not summary:
                # Fallback to first decent paragraph
                paragraphs = soup.find_all('p')
                for p in paragraphs:
                    text = p.get_text(strip=True)
                    if len(text) > 100:
                        summary = text
                        break
                        
            # Simplistic Date Extraction (Meta tags first)
            published = datetime.now() # Default
            date_meta = soup.find('meta', attrs={'property': 'article:published_time'}) or \
                        soup.find('meta', attrs={'name': 'date'})
            if date_meta:
                try:
                    date_str = date_meta.get('content', '')
                    # Attempt parse (very basic)
                    if date_str:
                         # Use dateutil if available, otherwise ignore complex parsing for this MVP
                         from dateutil import parser
                         published = parser.parse(date_str)
                except Exception:
                    pass

            return {
                'title': title,
                'link': url,
                'summary': summary,
                'published': published.isoformat(),
                'source': self._get_domain(url),
                'category': 'scraped_web'
            }

        except Exception as e:
            logger.error(f"Failed to scrape {url}: {e}")
            return None

    def _get_domain(self, url: str) -> str:
        from urllib.parse import urlparse
        try:
            return urlparse(url).netloc
        except:
            return "Unknown"

if __name__ == "__main__":
    # Test
    logging.basicConfig(level=logging.INFO)
    scraper = WebScraper()
    res = scraper.scrape_url("https://www.canada.ca/en.html")
    print(res)
