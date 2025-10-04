'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfidenceCircleProps {
  fakePercentage: number; // 0-100
  realPercentage: number; // 0-100
}

export default function ConfidenceCircle({ fakePercentage, realPercentage }: ConfidenceCircleProps) {
  const [displayFake, setDisplayFake] = useState(0);
  const [displayReal, setDisplayReal] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayFake(fakePercentage);
      setDisplayReal(realPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [fakePercentage, realPercentage]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate arc lengths
  const fakeArcLength = (fakePercentage / 100) * circumference;
  const realArcLength = (realPercentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="rgba(100, 100, 200, 0.1)"
            strokeWidth="20"
            fill="none"
          />
          
          {/* Fake percentage arc (red) */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#ef4444"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${fakeArcLength} ${circumference}`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${fakeArcLength} ${circumference}` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              filter: 'drop-shadow(0 0 10px #ef4444)',
            }}
          />
          
          {/* Real percentage arc (green) */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#10b981"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${realArcLength} ${circumference}`}
            strokeDashoffset={-fakeArcLength}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${realArcLength} ${circumference}` }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            style={{
              filter: 'drop-shadow(0 0 10px #10b981)',
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-white mb-2">Analysis</div>
          </motion.div>
        </div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-6 text-sm"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
          <span className="text-red-400 font-semibold">{Math.round(displayFake)}% Fake</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
          <span className="text-green-400 font-semibold">{Math.round(displayReal)}% Real</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

