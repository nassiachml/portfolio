"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
  color: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  delay = 0,
  color,
}: StatCardProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const displayValue = useTransform(spring, (value) => Math.round(value));
  const [currentValue, setCurrentValue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      spring.set(value);
    }, delay * 100);
  }, [value, spring, delay]);

  useEffect(() => {
    if (!mounted) return;
    const unsubscribe = displayValue.on("change", (latest) => {
      setCurrentValue(latest);
    });
    return () => unsubscribe();
  }, [displayValue, mounted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 hover:border-bordeaux-600 transition-all group"
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon
            className="text-white"
            size={24}
            style={{ color: color }}
          />
        </div>
        <motion.span
          className="text-3xl font-bold"
          style={{ color: color }}
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {currentValue}
          {suffix}
        </motion.span>
      </div>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </motion.div>
  );
}
