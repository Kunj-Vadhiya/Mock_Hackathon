'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

interface ResultCardProps {
  verdict: 'Fake' | 'Real' | 'Uncertain';
  confidence?: number;
}

export default function ResultCard({ verdict, confidence }: ResultCardProps) {
  const getVerdictConfig = () => {
    switch (verdict) {
      case 'Fake':
        return {
          icon: AlertTriangle,
          color: 'text-red-400',
          bgGradient: 'from-red-500/20 to-pink-500/20',
          borderColor: 'border-red-500/50',
          glowColor: 'shadow-red-500/50',
        };
      case 'Real':
        return {
          icon: CheckCircle2,
          color: 'text-green-400',
          bgGradient: 'from-green-500/20 to-emerald-500/20',
          borderColor: 'border-green-500/50',
          glowColor: 'shadow-green-500/50',
        };
      case 'Uncertain':
        return {
          icon: HelpCircle,
          color: 'text-yellow-400',
          bgGradient: 'from-yellow-500/20 to-orange-500/20',
          borderColor: 'border-yellow-500/50',
          glowColor: 'shadow-yellow-500/50',
        };
    }
  };

  const config = getVerdictConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`
        relative p-8 rounded-3xl glass-card
        bg-gradient-to-br ${config.bgGradient}
        border-2 ${config.borderColor}
        shadow-2xl ${config.glowColor}
      `}
    >
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', delay: 0.2 }}
          className={`${config.color}`}
        >
          <Icon className="w-16 h-16" />
        </motion.div>
        
        <div className="flex-1">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl font-bold ${config.color} mb-2`}
          >
            {verdict}
          </motion.h2>
          
          {confidence !== undefined && (
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-sm"
            >
              Detection Verdict
            </motion.p>
          )}
        </div>
      </div>

      {/* Animated background particles */}
      <motion.div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full ${config.color} opacity-10 blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
