'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Twitter, MessageSquare, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

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

export default function EvidencePanel({ evidences, keySignals }: EvidencePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSourceIcon = (source: Evidence['source']) => {
    switch (source) {
      case 'Twitter':
        return <Twitter className="w-4 h-4" />;
      case 'Reddit':
        return <MessageSquare className="w-4 h-4" />;
      case 'News':
        return <LinkIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Key Signals Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-2xl border-2 border-blue-500/20"
      >
        <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-2 h-2 bg-blue-400 rounded-full"
          />
          Key Signals
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {keySignals.map((signal, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
                         border border-blue-400/30 text-blue-200 text-sm
                         hover:border-blue-400/60 transition-all cursor-default"
            >
              {signal}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* External Evidence Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl border-2 border-cyan-500/20 overflow-hidden"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <h3 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            External Evidence ({evidences.length})
          </h3>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-cyan-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 space-y-4">
                {evidences.map((evidence, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-4 rounded-xl glass border-2
                      ${evidence.type === 'supporting' 
                        ? 'border-green-500/30 bg-green-500/5' 
                        : 'border-red-500/30 bg-red-500/5'
                      }
                      hover:border-opacity-60 transition-all group
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        p-2 rounded-lg
                        ${evidence.type === 'supporting' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                      `}>
                        {getSourceIcon(evidence.source)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-foreground line-clamp-1">
                            {evidence.title}
                          </h4>
                          <span className={`
                            text-xs px-2 py-1 rounded-full whitespace-nowrap
                            ${evidence.type === 'supporting' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                            }
                          `}>
                            {evidence.type}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {evidence.snippet}
                        </p>
                        
                        <a
                          href={evidence.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <span>View source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
