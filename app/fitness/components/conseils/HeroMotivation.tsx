"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = [
  "Tu avances. Même quand tu ne le vois pas.",
  "Le corps se transforme quand l'esprit s'apaise.",
  "La régularité est une forme de courage.",
  "Ce n'est pas une course. C'est un chemin.",
  "Avancer, doucement. Mais profondément.",
];

export default function HeroMotivation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-wellness-brown text-wellness-off-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(143,175,154,0.12)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(0,0,0,0.15)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 px-8 py-14 sm:py-20 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-wellness-off-white/95 mb-6 leading-tight"
        >
          Nutrition & Motivation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-wellness-off-white/70 text-base sm:text-lg mb-10"
        >
          Des chapitres pour nourrir ton énergie et ta constance.
        </motion.p>
        <div className="min-h-[4rem] flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="font-serif text-lg sm:text-xl text-wellness-off-white/90 italic tracking-tight"
            >
              {PHRASES[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 text-wellness-off-white/50 text-sm"
        >
          Scrollez pour découvrir
        </motion.p>
      </div>
    </section>
  );
}
