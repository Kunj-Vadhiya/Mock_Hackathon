'use client';

import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 border-4 border-purple-500/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-4 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute inset-8 border-4 border-t-pink-400 border-r-transparent border-b-transparent border-l-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg text-purple-300 font-semibold"
        >
          Analyzing...
        </motion.p>
      </div>

      {/* Scanning beam effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
