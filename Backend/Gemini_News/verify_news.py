"""
Enhanced Fake News Detection System with Ground Truth Verification
====================================================================
This version accepts a pre-labeled input (Real=1 or Fake=0) and finds
supporting evidence to explain WHY it's real or fake.
"""

import json
import os
from typing import Dict, List, Any
from tavily import TavilyClient
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# List of trusted Indian news website domains
INDIAN_NEWS_DOMAINS = [
    "timesofindia.indiatimes.com",
    "thehindu.com",
    "hindustantimes.com",
    "indianexpress.com",
    "ndtv.com",
    "thequint.com",
    "thewire.in",
    "scroll.in",
    "news18.com",
    "zeenews.india.com",
    "dnaindia.com",
    "deccanherald.com",
    "firstpost.com",
    "livemint.com",
    "businesstoday.in",
    "economictimes.indiatimes.com",
    "moneycontrol.com",
    "outlookindia.com",
    "newslaundry.com",
    "india.com",
    "mumbaimirror.indiatimes.com",
    "tribuneindia.com",
    "newindianexpress.com",
    "freepressjournal.in"
]


def configure_apis(tavily_api_key: str, gemini_api_key: str):
    """Configure Tavily and Gemini API clients."""
    try:
        tavily_client = TavilyClient(api_key=tavily_api_key)
        genai.configure(api_key=gemini_api_key)
        gemini_model = genai.GenerativeModel('gemini-2.5-flash')
        return tavily_client, gemini_model
    except Exception as e:
        raise Exception(f"API configuration failed: {str(e)}")


def extract_claims_for_verification(gemini_model, news_text: str, image_text: str, is_real: bool) -> List[str]:
    """
    Extract key claims from the news article that need verification.
    
    Args:
        gemini_model: Configured Gemini model
        news_text: The news article text
        image_text: Image description
        is_real: True if labeled as real (1), False if labeled as fake (0)
        
    Returns:
        List of claims to verify
    """
    try:
        combined_text = f"News Text: {news_text}"
        if image_text:
            combined_text += f"\n\nImage Description: {image_text}"
        
        label = "REAL" if is_real else "FAKE"
        
        prompt = f"""This news article is labeled as {label}.
Extract 3-5 key verifiable claims that can be fact-checked to {'confirm' if is_real else 'debunk'} this article.

Article:
{combined_text}

Return ONLY a numbered list of claims to verify, one per line.
Format:
1. [claim]
2. [claim]
3. [claim]
"""
        
        response = gemini_model.generate_content(prompt)
        claims_text = response.text.strip()
        
        claims = []
        for line in claims_text.split('\n'):
            line = line.strip()
            if line and (line[0].isdigit() or line.startswith('-')):
                claim = line.split('.', 1)[-1].strip()
                claim = claim.lstrip('-').strip()
                if claim:
                    claims.append(claim)
        
        return claims[:5]
    
    except Exception as e:
        print(f"Error extracting claims: {str(e)}")
        return []


def search_supporting_evidence(tavily_client, claims: List[str], is_real: bool) -> List[Dict[str, Any]]:
    """
    Search for evidence that supports whether the news is real or fake.
    
    Args:
        tavily_client: Configured Tavily client
        claims: List of claims to verify
        is_real: True if looking for evidence it's real, False if looking for evidence it's fake
        
    Returns:
        List of search results with URLs and content
    """
    try:
        # Create search query based on whether we're proving real or fake
        if is_real:
            # Search for confirmation
            search_query = " OR ".join(claims) + " confirmed true verified"
        else:
            # Search for debunking
            search_query = " OR ".join(claims) + " false fake debunked hoax misinformation"
        
        print(f"Searching for evidence that news is {'REAL' if is_real else 'FAKE'}...")
        
        search_results = tavily_client.search(
            query=search_query,
            include_domains=INDIAN_NEWS_DOMAINS,
            max_results=20,
            search_depth="advanced",
            days=365
        )
        
        results = []
        if 'results' in search_results:
            for result in search_results['results']:
                results.append({
                    'url': result.get('url', ''),
                    'title': result.get('title', ''),
                    'content': result.get('content', ''),
                    'score': result.get('score', 0),
                    'published_date': result.get('published_date', '')
                })
        
        return results
    
    except Exception as e:
        print(f"Error searching for evidence: {str(e)}")
        return []


def select_top_5_with_explanations(gemini_model, news_text: str, image_text: str, 
                                   is_real: bool, claims: List[str], 
                                   search_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Use Gemini to select top 5 most relevant sources and explain why the news is real/fake.
    
    Args:
        gemini_model: Configured Gemini model
        news_text: Original news text
        image_text: Image description
        is_real: True if real (1), False if fake (0)
        claims: Extracted claims
        search_results: Search results from Tavily
        
    Returns:
        Dictionary with top 5 links and explanations
    """
    try:
        label = "REAL" if is_real else "FAKE"
        
        # Prepare sources for Gemini
        sources_text = "\n\n".join([
            f"Source {i+1}:\nTitle: {r['title']}\nURL: {r['url']}\nContent: {r['content'][:400]}..."
            for i, r in enumerate(search_results[:15])
        ])
        
        prompt = f"""You are a fact-checking expert. This news article is labeled as {label}.

ORIGINAL NEWS:
{news_text}

IMAGE DESCRIPTION:
{image_text}

KEY CLAIMS TO VERIFY:
{chr(10).join([f"{i+1}. {claim}" for i, claim in enumerate(claims)])}

SOURCES FOUND:
{sources_text}

TASK:
1. Select the TOP 5 MOST RELEVANT sources that provide evidence about whether this news is {label}
2. For each source, explain HOW it supports the {label} label
3. Provide an overall explanation of WHY this news is {label} based on these sources

Return in this EXACT JSON format (no markdown, no code blocks):
{{
    "label": "{label}",
    "overall_explanation": "<2-3 sentences explaining WHY this news is {label}>",
    "top_5_sources": [
        {{
            "rank": 1,
            "url": "<url>",
            "title": "<title>",
            "source_name": "<news outlet name>",
            "relevance": "<high/medium/low>",
            "explanation": "<1-2 sentences explaining how this source {'confirms' if is_real else 'debunks'} the news>"
        }}
    ]
}}
"""
        
        response = gemini_model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Clean up response
        if response_text.startswith('```'):
            response_text = response_text.split('```')[1]
            if response_text.startswith('json'):
                response_text = response_text[4:]
        response_text = response_text.strip()
        
        result = json.loads(response_text)
        return result
    
    except json.JSONDecodeError as e:
        print(f"Error parsing Gemini response: {str(e)}")
        # Return default with available sources
        return {
            "label": "REAL" if is_real else "FAKE",
            "overall_explanation": f"Analysis indicates this news appears to be {'real' if is_real else 'fake'} based on available sources.",
            "top_5_sources": [
                {
                    "rank": i+1,
                    "url": r['url'],
                    "title": r['title'],
                    "source_name": r['url'].split('/')[2].replace('www.', '').split('.')[0].title(),
                    "relevance": "medium",
                    "explanation": f"This source provides information related to the claims in the article."
                }
                for i, r in enumerate(search_results[:5])
            ]
        }
    except Exception as e:
        print(f"Error in analysis: {str(e)}")
        return {
            "label": "REAL" if is_real else "FAKE",
            "overall_explanation": f"Error during analysis: {str(e)}",
            "top_5_sources": []
        }


def verify_news_with_ground_truth(news_input: Dict[str, Any], tavily_api_key: str, 
                                  gemini_api_key: str) -> Dict[str, Any]:
    """
    Main function to verify news with ground truth label.
    
    Args:
        news_input: Dictionary containing:
            - Text: News article text (required)
            - Imagetext: Image description (optional)
            - Link text: Source URL (optional)
            - Real/Fake: 1 for real, 0 for fake (required)
        tavily_api_key: Tavily API key
        gemini_api_key: Gemini API key
        
    Returns:
        Dictionary with label, explanation, and top 5 supporting sources
    """
    try:
        # Extract input fields
        news_text = news_input.get('Text', '')
        image_text = news_input.get('Imagetext', '')
        link_text = news_input.get('Link text', '')
        real_fake_label = news_input.get('Real/Fake', None)
        
        if not news_text:
            raise ValueError("News text is required")
        
        if real_fake_label is None:
            raise ValueError("Real/Fake label is required (1 for real, 0 for fake)")
        
        is_real = bool(int(real_fake_label))
        
        print(f"\n{'='*70}")
        print(f"VERIFYING NEWS LABELED AS: {'REAL' if is_real else 'FAKE'}")
        print(f"{'='*70}\n")
        
        print("Step 1: Configuring APIs...")
        tavily_client, gemini_model = configure_apis(tavily_api_key, gemini_api_key)
        
        print("Step 2: Extracting claims for verification...")
        claims = extract_claims_for_verification(gemini_model, news_text, image_text, is_real)
        print(f"Extracted {len(claims)} claims to verify")
        
        if not claims:
            return {
                "label": "REAL" if is_real else "FAKE",
                "overall_explanation": "Could not extract claims for verification",
                "top_5_sources": []
            }
        
        print("Step 3: Searching for supporting evidence...")
        search_results = search_supporting_evidence(tavily_client, claims, is_real)
        print(f"Found {len(search_results)} relevant sources")
        
        if not search_results:
            return {
                "label": "REAL" if is_real else "FAKE",
                "overall_explanation": f"No supporting sources found to {'verify' if is_real else 'debunk'} this news",
                "top_5_sources": []
            }
        
        print("Step 4: Selecting top 5 sources and generating explanations...")
        result = select_top_5_with_explanations(
            gemini_model, news_text, image_text, is_real, claims, search_results
        )
        
        print("Step 5: Complete!\n")
        
        return result
    
    except Exception as e:
        print(f"Error in verification: {str(e)}")
        return {
            "label": "ERROR",
            "overall_explanation": f"Error during verification: {str(e)}",
            "top_5_sources": [],
            "error": str(e)
        }


# Example usage
if __name__ == "__main__":
    # Load API keys
    TAVILY_API_KEY = os.getenv('TAVILY_API_KEY', '')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    
    # Example input
    sample_input = {
        "Imagetext": "A group of volunteers kneel on a sunny morning, planting young saplings along a city sidewalk. They wear bright green vests and use shovels to dig small holes; a banner in the background reads 'Urban Tree Drive 2025'.",
        "Text": "The city today launched an ambitious tree-planting initiative aimed at reducing urban heat and improving air quality. Mayor Lina Perez announced the program, which will plant 10,000 trees over two years in parks, streetscapes, and community spaces. The effort is expected to increase canopy cover, provide habitat for urban wildlife, and create cooling effects during summer months. Residents are invited to volunteer at weekend planting events.",
        "Link text": "https://example.com/news",
        "Real/Fake": 1  # 1 = Real, 0 = Fake
    }
    
    # Run verification
    result = verify_news_with_ground_truth(sample_input, TAVILY_API_KEY, GEMINI_API_KEY)
    
    # Print result
    print("\n" + "="*70)
    print("VERIFICATION RESULT")
    print("="*70)
    print(json.dumps(result, indent=2, ensure_ascii=False))
