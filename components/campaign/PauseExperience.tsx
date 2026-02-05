"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";

interface PauseExperienceProps {
  isActive: boolean;
  onClose: () => void;
}

export default function PauseExperience({ isActive, onClose }: PauseExperienceProps) {
  const [seconds, setSeconds] = useState(60);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setSeconds(60);
      setIsComplete(false);
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
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                key={seconds}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8"
              >
                <div className="text-9xl font-black text-white mb-4">{seconds}</div>
                <p className="text-xl text-white/80 font-light">secondes</p>
              </motion.div>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                Respire. Laisse ton esprit se reposer.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto px-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl mb-6"
              >
                ✨
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Le silence fait aussi partie<br />de ta journée.
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Prendre une pause, c'est aussi prendre soin de soi.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Retour
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
