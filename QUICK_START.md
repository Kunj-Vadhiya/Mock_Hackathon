# 🚀 Quick Start Guide

## Prerequisites
- ✅ Node.js 20+ installed
- ✅ npm or yarn package manager

## Installation & Running

### 1. Navigate to Frontend Directory
```powershell
cd d:\MockHackathon\Journal_Recommender\Frontend
```

### 2. Install Dependencies (if needed)
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm run dev
```

### 4. Open in Browser
Visit: **http://localhost:3000**

---

## 🎯 What You'll See

### Step 1: Splash Screen (3.5 seconds)
- Animated shield logo with orbiting sparkles
- Neon gradient background
- Auto-redirects to dashboard

### Step 2: Dashboard - Input
- Upload an image OR enter text/link
- Click the glowing "Detect" button

### Step 3: Loading State
- Beautiful rotating rings animation
- Scanning beam effect
- "Analyzing..." message

### Step 4: Results
- **Verdict Card**: Fake/Real/Uncertain with color coding
- **Confidence Circle**: Percentage with animated fill
- **Key Signals**: Interactive chips showing detection factors
- **External Evidence**: Collapsible panel with sources
- **Feedback**: Yes/No helpful buttons

---

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Splash screen
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main app
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/
│       ├── UploadButton.tsx
│       ├── InputBox.tsx
│       ├── DetectButton.tsx
│       ├── ResultCard.tsx
│       ├── ConfidenceCircle.tsx
│       ├── EvidencePanel.tsx
│       └── LoadingAnimation.tsx
├── package.json
└── Documentation/
    ├── FAKE_NEWS_DETECTOR_README.md
    ├── PROJECT_SUMMARY.md
    ├── COMPONENT_API.md
    └── VISUAL_GUIDE.md
```

---

## 🎨 Key Features

✨ **Futuristic UI**
- Dark theme with neon gradients
- Glassmorphism effects
- Smooth Framer Motion animations

🔍 **Detection Features**
- Multiple input methods (upload, text, links)
- AI-powered analysis (simulated)
- Explainable results

📊 **Results Display**
- Color-coded verdicts
- Confidence visualization
- Key signals highlighting
- External evidence panel

💬 **User Feedback**
- Helpful/Not helpful buttons
- Easy reset for new detection

---

## 🛠️ Available Scripts

```powershell
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🎨 Customization

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --neon-blue: #00d4ff;
  --neon-purple: #a855f7;
  /* ... more colors */
}
```

### Adjust Timings
Edit component files to modify animation durations:
```tsx
transition={{ duration: 2 }} // Change to your preference
```

---

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Clear Cache
```powershell
# Remove build cache
Remove-Item -Recurse -Force .next

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

### TypeScript Errors
```powershell
# Check for errors
npm run build

# Type check only
npx tsc --noEmit
```

---

## 📚 Documentation

- **README**: `FAKE_NEWS_DETECTOR_README.md`
- **Summary**: `PROJECT_SUMMARY.md`
- **API Reference**: `COMPONENT_API.md`
- **Visual Guide**: `VISUAL_GUIDE.md`

---

## 🌐 Access Points

- **Local**: http://localhost:3000
- **Network**: Check terminal output for network URL
- **Splash**: http://localhost:3000/
- **Dashboard**: http://localhost:3000/dashboard

---

## ✅ Current Status

**Server Status**: ✅ Running  
**Build Status**: ✅ No errors  
**Pages**: ✅ All compiled  
**Components**: ✅ All functional  

---

## 🎯 Next Steps

1. **Test the UI**: Click around and explore all features
2. **Backend Integration**: Connect to real AI API
3. **Customization**: Adjust colors and animations
4. **Deployment**: Build and deploy to Vercel/Netlify

---

## 💡 Tips

- **Responsive Design**: Resize browser to see mobile/tablet views
- **Dark Mode**: Already enabled by default
- **Animations**: All animations are GPU-accelerated
- **Performance**: Uses Next.js 15 with Turbopack for fast builds

---

## 🎉 Enjoy!

Your futuristic Multi-Agent Fake-News Detection Platform is ready!

**Happy Detecting! 🚀✨**
