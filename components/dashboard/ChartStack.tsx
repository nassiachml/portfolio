"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface StackData {
  name: string;
  percentage: number;
  color: string;
}

interface ChartStackProps {
  data: StackData[];
}

export default function ChartStack({ data }: ChartStackProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="space-y-4">
      {data.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex items-center gap-4"
        >
          <div className="w-24 text-sm font-semibold text-gray-300">
            {item.name}
          </div>
          <div className="flex-1">
            <div className="h-4 bg-dark-surface rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.percentage}%` } : {}}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + 0.3,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
          <div
            className="w-12 text-sm font-bold text-right"
            style={{ color: item.color }}
          >
            {item.percentage}%
          </div>
        </motion.div>
      ))}
    </div>
  );
}
