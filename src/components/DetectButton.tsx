'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface DetectButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function DetectButton({ onClick, isLoading = false, disabled = false }: DetectButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        relative px-12 py-4 rounded-full font-semibold text-lg
        bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600
        text-white shadow-lg overflow-hidden
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'animate-glow-pulse hover:shadow-2xl'}
      `}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"
        animate={{
          x: isLoading ? ['-100%', '100%'] : 0,
        }}
        transition={{
          duration: 1.5,
          repeat: isLoading ? Infinity : 0,
          ease: 'linear',
        }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            Detecting...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Detect
          </>
        )}
      </span>
    </motion.button>
  );
}
