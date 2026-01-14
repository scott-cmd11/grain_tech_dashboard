"""
Search Scraper Module

Leverages DuckDuckGo HTML version to perform search queries without external dependencies.
"""

import logging
import time
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class SearchScraper:
    """Handles search interactions using html.duckduckgo.com."""
    
    def __init__(self, max_retries: int = 3, delay: int = 2):
        self.max_retries = max_retries
        self.delay = delay
        self.session = requests.Session()
        self.session.headers.update({
             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
             'Referer': 'https://duckduckgo.com/',
             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        })

    def search(self, query: str, num_results: int = 5) -> List[Dict[str, Any]]:
        """
        Execute a search query against html.duckduckgo.com.
        
        Args:
            query: The search query string.
            num_results: Max number of results to return.
            
        Returns:
            List of dictionaries containing title, link, and summary.
        """
        results = []
        url = "https://html.duckduckgo.com/html/"
        
        try:
            # Polite delay
            time.sleep(self.delay)
            
            logger.info(f"Searching (HTML): {query[:50]}...")
            
            # Using POST for html.duckduckgo.com is standard
            payload = {'q': query, 'kl': 'ca-en'} # kl=ca-en for Canada English
            
            resp = self.session.post(url, data=payload, timeout=10)
            
            if resp.status_code != 200:
                logger.error(f"Search error: Status {resp.status_code}")
                return []
                
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # Parse results
            # DDG HTML structure often has 'div.result' or similar. 
            # Current structure typically: .result__body with .result__title and .result__snippet
            
            # Select result blocks
            result_blocks = soup.select('.result')
            
            count = 0
            for block in result_blocks:
                if count >= num_results:
                    break
                    
                title_tag = block.select_one('.result__title a')
                snippet_tag = block.select_one('.result__snippet')
                
                if title_tag:
                    link = title_tag.get('href', '')
                    title = title_tag.get_text(strip=True)
                    snippet = snippet_tag.get_text(strip=True) if snippet_tag else ""
                    
                    # Filter out ads or weird links
                    if 'duckduckgo.com' in link:
                        continue 
                        
                    results.append({
                        'title': title,
                        'link': link,
                        'summary': snippet,
                        'published': datetime.now().isoformat(),
                        'source': 'DuckDuckGo Search',
                        'category': 'search_result'
                    })
                    count += 1
                
        except Exception as e:
            logger.error(f"Search failed for query '{query}': {e}")
            
        return results

if __name__ == "__main__":
    # Test execution
    logging.basicConfig(level=logging.INFO)
    scraper = SearchScraper()
    hits = scraper.search("AI Strategy site:canada.ca", num_results=3)
    for h in hits:
        print(f"- {h['title']} \n  {h['link']}\n")
