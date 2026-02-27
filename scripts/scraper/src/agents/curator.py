"""
Curator Agent - AI-powered article relevance scoring and curation.

Uses Gemini to score articles for grain industry relevance and generate summaries.
"""

import json
import logging
import os
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)

# Relevance keywords for scoring (fallback if Gemini unavailable)
HIGH_VALUE_KEYWORDS = [
    # Core grain-tech terms
    'grain grading', 'grain quality', 'grain inspection', 'wheat testing',
    'barley testing', 'NIR analysis', 'machine vision grain', 'kernel analysis',
    'grain sorting', 'cereal inspection', 'grain analyzer', 'seed analysis',
    # Tracked company names
    'Cgrain', 'FOSS', 'GrainSense', 'Videometer', 'Zeutec', 'ZoomAgri',
    'QualySense', 'GoMicro', 'AgSure', 'Nebulaa', 'SuperGeo', 'Inarix',
    'Vibe Imaging', 'EasyODM', 'Cropify', 'Deimos Laboratory',
    'Ground Truth Ag', 'Upjao', 'Grainkart', 'Keyetech',
    'Grain Discovery', 'Platypus Vision', 'Shandong Hongsheng',
    # Tracked product names
    'EyeFoss', 'SeedLab', 'SeedSorter', 'SpectraAlyzer', 'MATT Grain',
    'QSorter', 'GrainScope', 'Indyn', 'PocketLab', 'QM3i',
]

MEDIUM_VALUE_KEYWORDS = [
    'grain industry', 'grain technology', 'agriculture AI', 'crop quality',
    'protein content', 'moisture testing', 'grain storage', 'grain handling',
    'CGC', 'Canadian Grain Commission', 'grain trade', 'harvest quality'
]

LOW_VALUE_KEYWORDS = [
    'wheat', 'barley', 'oats', 'canola', 'pulse crops', 'oilseeds',
    'harvest', 'farming technology', 'agricultural', 'crop'
]


def calculate_keyword_score(text: str) -> int:
    """
    Calculate relevance score based on keyword matching.
    
    Returns score 0-100.
    """
    text_lower = text.lower()
    score = 0
    
    for keyword in HIGH_VALUE_KEYWORDS:
        if keyword.lower() in text_lower:
            score += 20
            
    for keyword in MEDIUM_VALUE_KEYWORDS:
        if keyword.lower() in text_lower:
            score += 10
            
    for keyword in LOW_VALUE_KEYWORDS:
        if keyword.lower() in text_lower:
            score += 5
    
    return min(score, 100)  # Cap at 100


def score_with_gemini(article: Dict[str, Any], api_key: str) -> Optional[Dict[str, Any]]:
    """
    Use Gemini to score article relevance and generate summary.
    
    Returns dict with 'score' (0-100) and 'summary' (string).
    """
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        prompt = f"""You are a grain industry analyst. Score this article for relevance to the grain quality/grading technology industry.

Article Title: {article.get('title', '')}
Article Summary: {article.get('summary', '')[:500]}
Source: {article.get('source', '')}

Respond in JSON format only:
{{
  "relevance_score": <0-100 integer>,
  "reason": "<brief reason for score>",
  "summary": "<1-2 sentence summary focusing on grain industry relevance>"
}}

Scoring guide:
- 80-100: Directly about grain grading, quality testing, or inspection technology
- 60-79: About grain industry, agriculture AI, or crop quality
- 40-59: Tangentially related to grains or farming technology
- 0-39: Not relevant to grain industry
"""
        
        response = model.generate_content(prompt)
        result_text = response.text.strip()
        
        # Parse JSON from response
        if result_text.startswith('```'):
            result_text = result_text.split('```')[1]
            if result_text.startswith('json'):
                result_text = result_text[4:]
        
        result = json.loads(result_text)
        return {
            'score': int(result.get('relevance_score', 0)),
            'summary': result.get('summary', article.get('summary', '')[:200]),
            'reason': result.get('reason', '')
        }
        
    except Exception as e:
        logger.warning(f"Gemini scoring failed: {e}")
        return None


def curate_articles(
    articles: List[Dict[str, Any]],
    min_score: int = 60,
    max_articles: int = 15,
    use_ai: bool = True
) -> List[Dict[str, Any]]:
    """
    Score and filter articles for grain industry relevance.
    
    Args:
        articles: List of raw articles
        min_score: Minimum relevance score to include
        max_articles: Maximum number of articles to return
        use_ai: Whether to use Gemini for scoring (requires GEMINI_API_KEY)
        
    Returns:
        List of curated articles with scores
    """
    api_key = os.environ.get('GEMINI_API_KEY')
    scored_articles = []
    
    for article in articles:
        text = f"{article.get('title', '')} {article.get('summary', '')}"
        
        # Try Gemini first if enabled
        if use_ai and api_key:
            ai_result = score_with_gemini(article, api_key)
            if ai_result:
                article['relevance_score'] = ai_result['score']
                article['curated_summary'] = ai_result['summary']
                scored_articles.append(article)
                continue
        
        # Fallback to keyword scoring
        score = calculate_keyword_score(text)
        article['relevance_score'] = score
        scored_articles.append(article)
    
    # Filter and sort by score
    filtered = [a for a in scored_articles if a.get('relevance_score', 0) >= min_score]
    filtered.sort(key=lambda x: x.get('relevance_score', 0), reverse=True)
    
    logger.info(f"Curated {len(filtered)}/{len(articles)} articles (min_score={min_score})")
    
    return filtered[:max_articles]


def run_curator(input_path: Path, output_path: Path, config: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Run the curator on a raw intelligence file.
    
    Args:
        input_path: Path to raw_intel.json
        output_path: Path to write curated output
        config: Optional configuration dict
        
    Returns:
        Curation summary statistics
    """
    config = config or {}
    min_score = config.get('min_relevance_score', 60)
    max_articles = config.get('max_articles', 15)
    
    # Load raw articles
    with open(input_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    
    articles = raw_data.get('articles', [])
    logger.info(f"Loaded {len(articles)} raw articles for curation")
    
    # Curate
    curated = curate_articles(articles, min_score=min_score, max_articles=max_articles)
    
    # Build output
    output = {
        'generated_at': datetime.now().isoformat(),
        'total_items': len(curated),
        'curation_config': {
            'min_score': min_score,
            'max_articles': max_articles,
            'ai_enabled': bool(os.environ.get('GEMINI_API_KEY'))
        },
        'articles': curated
    }
    
    # Save curated output
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    logger.info(f"Saved {len(curated)} curated articles to {output_path}")
    
    return {
        'input_count': len(articles),
        'output_count': len(curated),
        'min_score_used': min_score
    }


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    
    # Test paths
    base_path = Path(__file__).resolve().parents[3]
    input_path = base_path / 'src' / 'data' / 'raw_intel.json'
    output_path = base_path / 'src' / 'data' / 'raw_intel_curated.json'
    
    if input_path.exists():
        stats = run_curator(input_path, output_path)
        print(f"Curation complete: {stats}")
    else:
        print(f"Input file not found: {input_path}")
