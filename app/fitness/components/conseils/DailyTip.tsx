"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const TIPS = [
  "Un verre d'eau avant chaque repas. Simple, et ton corps le sent.",
  "Deux minutes d'étirement. Une pause qui compte.",
  "Une chose positive de ta journée. À noter, sans jugement.",
  "Ta tenue, la veille. Un petit pas pour demain.",
  "Un fruit ou une poignée d'amandes. De l'énergie qui dure.",
];

export default function DailyTip() {
  const [tip, setTip] = useState(TIPS[0]);
  useEffect(() => {
    const day = new Date().getDate();
    setTip(TIPS[day % TIPS.length]);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="rounded-2xl bg-wellness-sage/10 border border-wellness-sage/20 p-6 sm:p-8"
    >
      <div className="flex items-start gap-5">
        <div className="w-10 h-10 rounded-xl bg-wellness-sage/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-wellness-sage-muted opacity-90" />
        </div>
        <div>
          <h3 className="font-serif text-sm font-medium text-wellness-brown/80 mb-2 tracking-tight">Astuce du jour</h3>
          <p className="text-wellness-brown/80 text-sm sm:text-base leading-relaxed">
            {tip}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
