"""
CSV Ingestion Module

Parses the user's Google Alerts CSV file to extract search queries and metadata.
"""

import csv
import logging
from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional

logger = logging.getLogger(__name__)

@dataclass
class AlertQuery:
    """Represents a single query from the CSV."""
    section: str
    alert_id: str
    title: str
    query: str
    is_site_specific: bool = False
    target_site: Optional[str] = None

    def __post_init__(self):
        """Analyze query to determine if it's site-specific."""
        if 'site:' in self.query:
            self.is_site_specific = True
            # Extract basic site domain if possible (simple heuristic)
            parts = self.query.split('site:')
            if len(parts) > 1:
                # Take the token immediately after site:
                site_part = parts[1].split()[0].strip(')"') 
                self.target_site = site_part


def load_alerts_csv(file_path: Path) -> List[AlertQuery]:
    """
    Load and parse the alerts CSV file.
    
    Args:
        file_path: Path to the CSV file.
        
    Returns:
        List of AlertQuery objects.
    """
    alerts = []
    
    if not file_path.exists():
        logger.error(f"CSV file not found: {file_path}")
        return []

    try:
        with open(file_path, 'r', encoding='utf-8-sig') as f:  # utf-8-sig handles BOM if present
            reader = csv.DictReader(f)
            
            for row in reader:
                # CSV columns: Section,Alert_ID,Title,Query
                # Normalize keys just in case
                query_text = row.get('Query', '').strip()
                if not query_text:
                    continue
                    
                alert = AlertQuery(
                    section=row.get('Section', ''),
                    alert_id=row.get('Alert_ID', ''),
                    title=row.get('Title', ''),
                    query=query_text
                )
                alerts.append(alert)
                
        logger.info(f"Loaded {len(alerts)} alerts from {file_path}")
        
    except Exception as e:
        logger.error(f"Error parsing CSV {file_path}: {e}")
        
    return alerts

if __name__ == "__main__":
    # fast test
    base_path = Path(__file__).parent.parent.parent
    csv_path = base_path / "data" / "google_alerts_all_utf8.csv"
    print(f"Testing CSV load from: {csv_path}")
    
    # robust logging for test
    logging.basicConfig(level=logging.INFO)
    
    try:
        results = load_alerts_csv(csv_path)
        print(f"\nFound {len(results)} queries.")
        
        print("\nSample Site Specific:")
        site_specific = [a for a in results if a.is_site_specific]
        for a in site_specific[:3]:
            print(f" - [{a.alert_id}] {a.title}: {a.target_site} | Q: {a.query[:50]}...")

        print("\nSample General:")
        general = [a for a in results if not a.is_site_specific]
        for a in general[:3]:
            print(f" - [{a.alert_id}] {a.title} | Q: {a.query[:50]}...")
            
    except Exception as e:
        print(f"Test failed: {e}")
