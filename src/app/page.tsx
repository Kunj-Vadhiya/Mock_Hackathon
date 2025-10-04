'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.08, 0.05],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 1,
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="p-8 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500"
            >
              <Shield className="w-24 h-24 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
        >
          Multi-Agent
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Fake-News Detection Platform
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-8"
        >
          An interactive dashboard for explainable results
        </motion.p>

        {/* Loading animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

