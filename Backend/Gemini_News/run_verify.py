"""
Simple script to verify news from YOUR input JSON file
"""

import json
import os
import sys
from dotenv import load_dotenv
from verify_news import verify_news_with_ground_truth

# Fix Windows encoding for emojis
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

print("\n" + "="*70)
print("🔍 NEWS VERIFICATION SYSTEM")
print("="*70)

# Check API keys
TAVILY_API_KEY = os.getenv('TAVILY_API_KEY', '')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')

if not TAVILY_API_KEY or not GEMINI_API_KEY:
    print("\n❌ ERROR: API keys not configured in .env file!")
    exit(1)

print("✅ API keys loaded\n")

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Always use input.json by default (in the same directory as this script)
json_file = os.path.join(script_dir, "input.json")
if len(sys.argv) > 1:
    json_file = sys.argv[1]

# Load JSON file
try:
    with open(json_file, 'r', encoding='utf-8') as f:
        news_input = json.load(f)
    print(f"\n✅ Loaded input from: {json_file}")
except FileNotFoundError:
    print(f"\n❌ ERROR: File '{json_file}' not found!")
    print("\nMake sure the file exists in the current directory or provide full path.")
    exit(1)
except json.JSONDecodeError:
    print(f"\n❌ ERROR: Invalid JSON format in '{json_file}'")
    exit(1)

# Validate required fields
if 'Text' not in news_input or not news_input['Text']:
    print("\n❌ ERROR: 'Text' field is required in JSON!")
    exit(1)

if 'Real/Fake' not in news_input:
    print("\n❌ ERROR: 'Real/Fake' field is required in JSON!")
    print("   Set to 1 for REAL or 0 for FAKE")
    exit(1)

# Display what we're verifying
label = "REAL" if news_input.get('Real/Fake') == 1 else "FAKE"
print(f"\n📰 Article preview:")
print(f"   {news_input['Text'][:100]}...")
print(f"\n🏷️  Labeled as: {label}")

print("\n" + "="*70)
print("⏳ FINDING EVIDENCE... (This takes 10-15 seconds)")
print("="*70)

# Run verification
try:
    result = verify_news_with_ground_truth(news_input, TAVILY_API_KEY, GEMINI_API_KEY)
    
    # Display results
    print("\n" + "="*70)
    print("📊 RESULTS")
    print("="*70)
    
    print(f"\n🏷️  Label: {result.get('label', 'Unknown')}")
    print(f"\n💡 Overall Explanation:")
    print(f"   {result.get('overall_explanation', 'No explanation')}")
    
    top_sources = result.get('top_5_sources', [])
    if top_sources:
        print(f"\n🔗 TOP {len(top_sources)} SUPPORTING SOURCES:")
        print("="*70)
        
        for source in top_sources:
            print(f"\n{source.get('rank', '?')}. {source.get('title', 'Unknown')}")
            print(f"   📰 {source.get('source_name', 'Unknown')} | Relevance: {source.get('relevance', 'unknown').upper()}")
            print(f"   💬 {source.get('explanation', 'No explanation')}")
            print(f"   🔗 {source.get('url', 'No URL')}")
    
    print("\n" + "="*70)
    print("📄 FULL JSON:")
    print("="*70)
    print(json.dumps(result, indent=2, ensure_ascii=False))
    
    # Save result
    output_file = json_file.replace('.json', '_result.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    print(f"\n💾 Result saved to: {output_file}")
    
    print("\n" + "="*70)
    print("✨ Verification Complete!")
    print("="*70)

except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    exit(1)
