'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import UploadButton from '@/components/UploadButton';
import InputBox from '@/components/InputBox';
import DetectButton from '@/components/DetectButton';
import ResultCard from '@/components/ResultCard';
import ConfidenceCircle from '@/components/ConfidenceCircle';
import EvidencePanel from '@/components/EvidencePanel';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function DashboardPage() {
  const [inputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    verdict: 'Fake' | 'Real' | 'Uncertain';
    confidence: number;
    fakePercentage: number;
    realPercentage: number;
    keySignals: string[];
    evidences: Array<{
      source: string;
      title: string;
      url: string;
      snippet: string;
      type: 'supporting' | 'contradicting';
    }>;
  } | null>(null);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
    console.log('Uploaded file:', file.name);
  };

  const handleInputSubmit = (text: string) => {
    setInputText(text);
  };

  const handleDetect = async () => {
    if (!inputText.trim() && !uploadedFile) {
      alert('Please enter some text or upload an image first!');
      return;
    }

    setIsLoading(true);
    
    // Sample random results
    const sampleResults = [
      {
        verdict: 'Fake' as const,
        confidence: 87,
        fakePercentage: 87,
        realPercentage: 13,
        keySignals: [
          'Misleading headline detected',
          'Source credibility score: Very Low (12/100)',
          'Emotional manipulation patterns identified',
          'Fact-checking failed on 3 key claims',
          'No corroboration from reputable sources'
        ],
        evidences: [
          {
            source: 'Snopes',
            title: 'Fact Check by Snopes - Claim Debunked',
            url: 'https://snopes.com',
            snippet: 'This claim has been thoroughly debunked by multiple sources...',
            type: 'contradicting' as const
          },
          {
            source: 'Reuters',
            title: 'Reuters Fact Check: False Information',
            url: 'https://reuters.com/fact-check',
            snippet: 'No credible evidence supports this claim...',
            type: 'contradicting' as const
          },
          {
            source: 'AP News',
            title: 'AP News Verification Report',
            url: 'https://apnews.com/hub/fact-checking',
            snippet: 'Original source could not be verified. Similar claims previously debunked...',
            type: 'contradicting' as const
          }
        ]
      },
      {
        verdict: 'Real' as const,
        confidence: 94,
        fakePercentage: 6,
        realPercentage: 94,
        keySignals: [
          'Verified by multiple credible sources',
          'Source credibility score: Excellent (91/100)',
          'Consistent with historical facts',
          'Cross-referenced with official databases',
          'No signs of manipulation or bias'
        ],
        evidences: [
          {
            source: 'BBC News',
            title: 'BBC News - Original Report',
            url: 'https://bbc.com/news',
            snippet: 'Multiple sources confirm the accuracy of this report...',
            type: 'supporting' as const
          },
          {
            source: 'The Guardian',
            title: 'The Guardian - Investigation',
            url: 'https://theguardian.com',
            snippet: 'Independent investigation validates these claims...',
            type: 'supporting' as const
          },
          {
            source: 'Associated Press',
            title: 'Associated Press - Verification',
            url: 'https://apnews.com',
            snippet: 'Information verified through official channels...',
            type: 'supporting' as const
          }
        ]
      },
      {
        verdict: 'Uncertain' as const,
        confidence: 52,
        fakePercentage: 48,
        realPercentage: 52,
        keySignals: [
          'Mixed signals from various sources',
          'Source credibility score: Moderate (55/100)',
          'Partially verified information',
          'Requires additional fact-checking',
          'Some claims lack sufficient evidence'
        ],
        evidences: [
          {
            source: 'PolitiFact',
            title: 'PolitiFact - Needs Context',
            url: 'https://politifact.com',
            snippet: 'The claim needs more context to determine accuracy...',
            type: 'supporting' as const
          },
          {
            source: 'FactCheck.org',
            title: 'FactCheck.org - Inconclusive',
            url: 'https://factcheck.org',
            snippet: 'Available evidence is inconclusive at this time...',
            type: 'contradicting' as const
          },
          {
            source: 'Poynter',
            title: 'Poynter - Analysis Pending',
            url: 'https://poynter.org',
            snippet: 'Further investigation needed to verify core claims...',
            type: 'supporting' as const
          }
        ]
      }
    ];

    // Randomly select one of the sample results
    const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setResults(randomResult);
    setIsLoading(false);
  };

  const handleFeedback = (helpful: boolean) => {
    console.log('Feedback:', helpful ? 'Yes' : 'No');
    // Here you would send feedback to your backend
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Fake News Detector
          </h1>
          <p className="text-slate-400 text-lg">
            Upload, analyze, and get instant AI-powered verdicts
          </p>
        </motion.div>

        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto glass-card rounded-3xl border-2 border-blue-500/20 p-8 md:p-12 shadow-2xl"
        >
        {/* Input Section */}
        {!results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-8">
              {/* Upload and Input side by side */}
              <div className="flex items-center gap-6 w-full">
                <div className="flex-shrink-0">
                  <UploadButton onUpload={handleUpload} />
                </div>
                <div className="flex-1">
                  <InputBox onSubmit={handleInputSubmit} />
                </div>
              </div>

              <DetectButton
                onClick={handleDetect}
                isLoading={isLoading}
                disabled={!inputText && !uploadedFile}
              />
            </div>

            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 rounded-xl text-center"
              >
                <p className="text-sm text-foreground">
                  📎 {uploadedFile.name}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto text-center py-20"
          >
            <div className="relative w-64 h-64 mx-auto">
              <motion.div
                className="absolute inset-0 border-4 border-blue-500/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-4 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-8 border-4 border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg text-blue-300">Analyzing...</p>
              </div>
            </div>
            
            <motion.div
              className="mt-8 h-1 max-w-md mx-auto bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-white/50"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Results Section */}
        {results && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Display Input Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-blue-500/20"
            >
              <h3 className="text-lg font-semibold text-white mb-3">Analyzed Content</h3>
              {uploadedFile ? (
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-2xl">🖼️</span>
                  <span>{uploadedFile.name}</span>
                </div>
              ) : (
                <p className="text-slate-300 whitespace-pre-wrap">{inputText}</p>
              )}
            </motion.div>

            {/* Results Grid: Pie Chart + Reasons */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Pie Chart */}
              <div className="flex items-center justify-center">
                <ConfidenceCircle 
                  fakePercentage={results.fakePercentage} 
                  realPercentage={results.realPercentage} 
                />
              </div>

              {/* Right: Verdict and Reasons */}
              <div className="space-y-6">
                {/* Verdict Card */}
                <ResultCard verdict={results.verdict} confidence={results.confidence} />
                
                {/* Reasons Block */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 rounded-2xl border-2 border-blue-500/20"
                >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                    Reasons Why It's {results.verdict}
                  </h3>
                  
                  <ul className="space-y-3">
                    {results.keySignals.map((signal, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{signal}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Reference Links */}
                  <div className="mt-6 pt-6 border-t border-blue-500/20">
                    <h4 className="text-sm font-semibold text-slate-400 mb-3">Reference Links</h4>
                    <div className="space-y-2">
                      {results.evidences.slice(0, 3).map((evidence, index) => (
                        <motion.a
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          href={evidence.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm group"
                        >
                          <span className="text-xs">🔗</span>
                          <span className="truncate group-hover:underline">{evidence.title}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Feedback Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <p className="text-foreground mb-4">Was this result helpful?</p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFeedback(true)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white
                           flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/50 transition-all"
                >
                  <ThumbsUp className="w-5 h-5" />
                  Yes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFeedback(false)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white
                           flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/50 transition-all"
                >
                  <ThumbsDown className="w-5 h-5" />
                  No
                </motion.button>
              </div>
            </motion.div>

            {/* New Detection Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setResults(null)}
                className="px-8 py-3 rounded-full glass-card border-2 border-blue-500/50 
                         text-blue-300 hover:border-blue-400 hover:text-blue-200 transition-all"
              >
                ← New Detection
              </motion.button>
            </div>
          </motion.div>
        )}
        </motion.div>
      </div>
    </div>
  );
}

