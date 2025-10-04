# Multi-Agent Fake-News Detection Platform

A futuristic web platform capable of detecting and explaining fake or misleading news with an interactive, beautiful UI.

## 🌟 Features

- **AI-Powered Detection**: Advanced multi-agent system for fake news detection
- **Interactive Dashboard**: Beautiful, futuristic UI with glassmorphism and neon effects
- **Multiple Input Methods**: Support for text, links, and image uploads
- **Explainable Results**: 
  - Clear verdict (Fake / Real / Uncertain)
  - Confidence score with circular visualization
  - Key signals highlighting
  - External evidence from Twitter/X, Reddit, and news sources
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion for delightful interactions

## 🎨 Design Features

- **Dark Futuristic Theme**: Neon gradients (blue, cyan, purple, pink)
- **Glassmorphism Cards**: Blur effects with glowing borders
- **Animated Elements**: 
  - Splash screen with logo animation
  - Loading states with scanning waves
  - Smooth transitions and hover effects
- **No Clutter**: Single-screen focus with no navbar or sidebar

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
cd Frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Splash screen
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── UploadButton.tsx      # File upload component
│   │   ├── InputBox.tsx          # Text/link input
│   │   ├── DetectButton.tsx      # Detection trigger
│   │   ├── ResultCard.tsx        # Verdict display
│   │   ├── ConfidenceCircle.tsx  # Circular progress
│   │   ├── EvidencePanel.tsx     # External evidence
│   │   └── LoadingAnimation.tsx  # Loading state
│   └── lib/
```

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## 🎯 User Flow

1. **Splash Screen**: Animated logo with auto-redirect to dashboard (3.5s)
2. **Dashboard**: 
   - Upload images or enter text/links
   - Click "Detect" button
   - View animated loading state
   - See results with verdict, confidence, signals, and evidence
   - Provide feedback (helpful/not helpful)
   - Start new detection

## 🎨 Color Scheme

- **Background**: Deep dark (#0a0a0f, #1a0a2e)
- **Neon Blue**: #00d4ff
- **Neon Cyan**: #06b6d4
- **Neon Purple**: #a855f7
- **Neon Pink**: #ec4899
- **Foreground**: #e0e0ff

## 🔮 Future Enhancements

- Real backend integration with AI models
- User authentication and history
- Advanced filtering and search
- Export results as PDF
- Multi-language support
- Browser extension

## 📝 License

MIT License

## 👥 Contributors

Built with ❤️ for detecting misinformation and promoting truth.
