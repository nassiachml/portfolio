"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Book, Sun } from "lucide-react";

interface OfflineExperienceProps {
  isActive: boolean;
  onClose: () => void;
}

export default function OfflineExperience({ isActive, onClose }: OfflineExperienceProps) {
  const [seconds, setSeconds] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [showGrain, setShowGrain] = useState(true);

  useEffect(() => {
    if (!isActive) {
      setSeconds(30);
      setIsComplete(false);
      setShowGrain(true);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-green-50 z-50 flex items-center justify-center"
      >
        {/* Grain texture */}
        {showGrain && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }} />
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 text-amber-900/40 hover:text-amber-900 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center px-6"
            >
              <motion.div
                key={seconds}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8"
              >
                <div className="text-8xl font-light text-amber-900 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                  {seconds}
                </div>
                <p className="text-xl text-amber-700/80 font-light">secondes</p>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-amber-900/70 text-lg max-w-md mx-auto font-light leading-relaxed"
              >
                Pose ton téléphone. Respire.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto px-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="flex justify-center gap-4 mb-8"
              >
                <Coffee className="w-12 h-12 text-amber-700" />
                <Book className="w-12 h-12 text-amber-700" />
                <Sun className="w-12 h-12 text-amber-700" />
              </motion.div>
              <h2 
                className="text-5xl md:text-6xl font-light text-amber-900 mb-6 leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Moins faire.<br />Mieux être.
              </h2>
              <p className="text-xl text-amber-700/80 mb-8 leading-relaxed font-light">
                Le dimanche n'est pas fait pour performer.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-8 py-4 bg-amber-900 text-white font-medium rounded-xl hover:bg-amber-800 transition-all"
              >
                Continuer à scroller
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
