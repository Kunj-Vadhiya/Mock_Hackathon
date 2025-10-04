# Fake News Detection System

A sophisticated fake news detection system that uses **Tavily API** for web scraping and **Google Gemini API** for AI-powered analysis.

## Features

- 🔍 **Claim Extraction**: Automatically extracts 3-5 verifiable claims from news articles
- 🌐 **Multi-Source Verification**: Searches 20+ trusted Indian news websites
- 🤖 **AI Analysis**: Uses Gemini AI to cross-reference and verify claims
- 📊 **Confidence Scoring**: Provides authenticity percentage and confidence scores
- 🔗 **Source Links**: Returns supporting/contradicting sources with URLs

## How It Works

### Step 1: Setup and Configuration
- Configures Tavily and Gemini API clients
- Defines trusted Indian news domains for verification

### Step 2: Extract Key Claims
- Uses Gemini AI to extract 3-5 verifiable factual claims
- Focuses on concrete facts: names, dates, numbers, locations, events

### Step 3: Search Indian News Sites
- Uses Tavily API to search 20+ Indian news websites
- Searches with advanced depth for the past year
- Collects up to 20 relevant sources

### Step 4: Analyze with Gemini
- Cross-references extracted claims with search results
- Calculates verified, contradicted, and unverified claims
- Computes authenticity and fake percentages
- Assigns confidence score based on source quality

### Step 5: Format Output
- Returns structured JSON with verdict and supporting links

## Installation

```bash
pip install -r requirements.txt
```

## API Keys Required

1. **Tavily API Key**: Get from [https://tavily.com](https://tavily.com)
2. **Google Gemini API Key**: Get from [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

## Usage

### Basic Usage

```python
from news import detect_fake_news

# Input news article
news_input = {
    "Imagetext": "Description of image in the news article",
    "Text": "The main news article text here...",
    "Link": "https://example.com/news-link"
}

# Detect fake news
result = detect_fake_news(
    news_input,
    tavily_api_key="your-tavily-api-key",
    gemini_api_key="your-gemini-api-key"
)

print(result)
```

### Using Environment Variables

```python
import os
from news import detect_fake_news

# Set environment variables
os.environ['TAVILY_API_KEY'] = 'your-tavily-api-key'
os.environ['GEMINI_API_KEY'] = 'your-gemini-api-key'

# Use in code
result = detect_fake_news(
    news_input,
    os.getenv('TAVILY_API_KEY'),
    os.getenv('GEMINI_API_KEY')
)
```

### Run Example

```bash
# Set environment variables
$env:TAVILY_API_KEY="your-tavily-api-key"
$env:GEMINI_API_KEY="your-gemini-api-key"

# Run the example
python news.py
```

## Input Format

```json
{
    "Imagetext": "Description of the image in the news article (optional)",
    "Text": "The main text of the news article (required)",
    "Link": "URL of the news article (optional)"
}
```

## Output Format

```json
{
    "fake_percentage": 20,
    "confidence_score": 80,
    "verdict": "Partially True",
    "supporting_links": [
        {
            "url": "https://timesofindia.com/...",
            "title": "Headline from source",
            "supports": true,
            "source": "Times Of India"
        }
    ]
}
```

## Output Fields

- **fake_percentage**: Integer (0-100) - Higher means more likely to be fake
  - 0-20: Authentic
  - 21-40: Mostly Authentic
  - 41-60: Partially True
  - 61-80: Mostly False
  - 81-100: False

- **confidence_score**: Integer (0-100) - How confident the system is in its verdict

- **verdict**: One of: "Authentic", "Mostly Authentic", "Partially True", "Mostly False", "False"

- **supporting_links**: Array of sources that verify or contradict the claims
  - `url`: URL of the source
  - `title`: Title/headline from the source
  - `supports`: true if supports the claim, false if contradicts
  - `source`: Name of the news outlet

## Indian News Sources Searched

The system searches across 20+ trusted Indian news websites including:
- Times of India
- The Hindu
- Hindustan Times
- Indian Express
- NDTV
- The Quint
- The Wire
- Scroll.in
- News18
- Zee News
- DNA India
- Deccan Herald
- Firstpost
- LiveMint
- Business Standard
- Economic Times
- And more...

## Error Handling

The system includes comprehensive error handling:
- API configuration errors
- Claim extraction failures
- Search timeout handling
- JSON parsing errors
- Network connectivity issues

All errors return a safe default response with appropriate error messages.

## Limitations

- Requires active internet connection
- API rate limits apply based on your subscription
- Analysis quality depends on availability of sources
- Best results with English news articles
- Limited to news from the past year

## Contributing

Feel free to contribute by:
- Adding more news sources
- Improving claim extraction prompts
- Enhancing error handling
- Adding support for regional languages

## License

MIT License
