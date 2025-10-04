'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface InputBoxProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
}

export default function InputBox({ onSubmit, placeholder = "Enter news link or text..." }: InputBoxProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={4}
          className={`
            w-full px-6 py-4 rounded-2xl
            glass-card text-foreground placeholder:text-muted-foreground
            resize-none outline-none transition-all duration-300
            ${isFocused ? 'neon-border-blue' : 'border-2 border-blue-500/20'}
            focus:neon-border-blue
          `}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.form>
  );
}
