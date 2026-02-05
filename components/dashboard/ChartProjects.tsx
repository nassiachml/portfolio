"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ChartData {
  name: string;
  count: number;
  color: string;
}

interface ChartProjectsProps {
  data: ChartData[];
}

export default function ChartProjects({ data }: ChartProjectsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <div ref={ref} className="space-y-3">
      {data.map((item, index) => {
        const percentage = (item.count / total) * 100;
        const barWidth = (item.count / maxCount) * 100;

        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-300">
                {item.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{item.count} projets</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: item.color }}
                >
                  {percentage.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-3 bg-dark-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${barWidth}%` } : {}}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + 0.3,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
