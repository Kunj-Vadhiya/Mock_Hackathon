# Component API Reference

## UploadButton

**Location**: `src/components/UploadButton.tsx`

### Props
```typescript
interface UploadButtonProps {
  onUpload: (file: File) => void;
}
```

### Usage
```tsx
<UploadButton onUpload={(file) => console.log(file)} />
```

### Features
- Drag & drop support
- File type validation (images only)
- Hover and drag states
- Neon glow effects

---

## InputBox

**Location**: `src/components/InputBox.tsx`

### Props
```typescript
interface InputBoxProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
}
```

### Usage
```tsx
<InputBox 
  onSubmit={(text) => console.log(text)}
  placeholder="Enter news link or text..."
/>
```

### Features
- Auto-resizing textarea
- Focus state with neon border
- Animated gradient underline
- Glassmorphism styling

---

## DetectButton

**Location**: `src/components/DetectButton.tsx`

### Props
```typescript
interface DetectButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}
```

### Usage
```tsx
<DetectButton 
  onClick={handleDetect}
  isLoading={isLoading}
  disabled={!hasInput}
/>
```

### Features
- Gradient background animation
- Loading state with spinner
- Disabled state styling
- Glow pulse effect

---

## ResultCard

**Location**: `src/components/ResultCard.tsx`

### Props
```typescript
interface ResultCardProps {
  verdict: 'Fake' | 'Real' | 'Uncertain';
  confidence?: number;
}
```

### Usage
```tsx
<ResultCard verdict="Fake" confidence={87} />
```

### Features
- Color-coded by verdict
- Animated entrance
- Dynamic icon display
- Pulsing background effect

---

## ConfidenceCircle

**Location**: `src/components/ConfidenceCircle.tsx`

### Props
```typescript
interface ConfidenceCircleProps {
  score: number; // 0-100
}
```

### Usage
```tsx
<ConfidenceCircle score={87} />
```

### Features
- SVG circular progress
- Animated fill transition
- Color-coded by score:
  - Green: 70-100%
  - Yellow: 40-69%
  - Red: 0-39%
- Glow effect

---

## EvidencePanel

**Location**: `src/components/EvidencePanel.tsx`

### Props
```typescript
interface Evidence {
  source: 'Twitter' | 'Reddit' | 'News';
  title: string;
  url: string;
  snippet: string;
  type: 'supporting' | 'contradicting';
}

interface EvidencePanelProps {
  evidences: Evidence[];
  keySignals: string[];
}
```

### Usage
```tsx
<EvidencePanel 
  evidences={[
    {
      source: 'Twitter',
      title: 'Expert debunks claim',
      url: 'https://twitter.com/example',
      snippet: 'Fact-checkers have...',
      type: 'contradicting'
    }
  ]}
  keySignals={['Unverified source', 'Sensational language']}
/>
```

### Features
- Key signals as interactive chips
- Collapsible evidence section
- Source icons (Twitter, Reddit, News)
- Color-coded by type
- External link buttons

---

## LoadingAnimation

**Location**: `src/components/LoadingAnimation.tsx`

### Props
None

### Usage
```tsx
<LoadingAnimation />
```

### Features
- Triple rotating rings
- Scanning beam effect
- Pulsing text
- Fully self-contained

---

## Color Coding Guide

### Verdict Colors
- **Fake**: Red (`#ef4444`)
- **Real**: Green (`#10b981`)
- **Uncertain**: Yellow (`#f59e0b`)

### Confidence Levels
- **High (70-100%)**: Green
- **Medium (40-69%)**: Yellow
- **Low (0-39%)**: Red

### Theme Colors
- **Neon Blue**: `#00d4ff`
- **Neon Cyan**: `#06b6d4`
- **Neon Purple**: `#a855f7`
- **Neon Pink**: `#ec4899`
- **Background**: `#0a0a0f`
- **Foreground**: `#e0e0ff`

---

## Animation Timings

- **Splash screen duration**: 3.5s
- **Detection loading**: ~3s (simulated)
- **Component entrance**: 0.5-0.8s
- **Hover effects**: 0.3s
- **Glow pulse**: 2s cycle

---

## Responsive Breakpoints

All components use Tailwind's default breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

---

## Accessibility

All components include:
- Semantic HTML
- Keyboard navigation support
- Focus states
- ARIA labels (where applicable)
- Screen reader friendly

---

## Performance Tips

1. Components use `'use client'` directive for client-side rendering
2. Framer Motion animations are GPU-accelerated
3. Images should be optimized before upload
4. Use React.memo() for expensive components if needed
5. Lazy load components not in viewport

---

## Customization

### Changing Colors
Edit `globals.css`:
```css
:root {
  --neon-blue: #00d4ff;
  --neon-cyan: #06b6d4;
  --neon-purple: #a855f7;
  --neon-pink: #ec4899;
}
```

### Adjusting Animations
Modify Framer Motion props:
```tsx
<motion.div
  animate={{ ... }}
  transition={{ 
    duration: 2,  // Change timing
    ease: 'easeOut'  // Change easing
  }}
/>
```

### Adding New Components
Follow the existing pattern:
1. Create in `src/components/`
2. Add `'use client'` directive
3. Use TypeScript interfaces
4. Include Framer Motion animations
5. Apply glassmorphism and neon styling
