"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
  index: number;
}

export default function SkillBar({
  name,
  percentage,
  color,
  index,
}: SkillBarProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300">{name}</span>
        <span className="text-sm font-bold" style={{ color: color }}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
