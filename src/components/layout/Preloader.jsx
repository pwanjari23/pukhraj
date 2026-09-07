'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant luxury progress counter 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 250);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 8;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#09090b] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <div className="text-center px-6 max-w-sm w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="tracking-[0.4em] text-[10px] font-sans text-[#C5A059] uppercase mb-2.5 font-medium"
            >
              The Royal Heritage
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#FAF8F5] uppercase font-light"
            >
              PUKHRAJ
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-[9px] tracking-[0.5em] text-neutral-400 uppercase mt-1"
            >
              JEWELLERS • NAGPUR
            </motion.div>

            {/* Progress Bar & Percentage Indicator */}
            <div className="mt-8 space-y-2">
              <div className="relative h-[1.5px] w-48 mx-auto bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-[10px] font-sans tracking-widest text-[#E2C792] font-mono">
                {progress}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
