"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  type: string;
  stack: string[];
  badge: "Fictif" | "Réel";
  link: string;
  index: number;
}

export default function ProjectCard({
  title,
  type,
  stack,
  badge,
  link,
  index,
}: ProjectCardProps) {
  const badgeColor =
    badge === "Fictif"
      ? "bg-purple-900/30 text-purple-400 border-purple-600"
      : "bg-emerald-900/30 text-emerald-400 border-emerald-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl p-4 hover:border-bordeaux-600 transition-all group"
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1 group-hover:text-bordeaux-400 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-gray-400">{type}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {stack.slice(0, 3).map((tech, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-dark-surface border border-dark-border rounded text-xs text-gray-300"
          >
            {tech}
          </span>
        ))}
        {stack.length > 3 && (
          <span className="px-2 py-1 bg-dark-surface border border-dark-border rounded text-xs text-gray-300">
            +{stack.length - 3}
          </span>
        )}
      </div>

      {link.startsWith("/") ? (
        <Link
          href={link}
          className="flex items-center gap-2 text-sm text-bordeaux-400 hover:text-bordeaux-300 transition-colors"
        >
          <Code size={14} />
          <span>Voir le projet</span>
          <ExternalLink size={12} />
        </Link>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-bordeaux-400 hover:text-bordeaux-300 transition-colors"
        >
          <Code size={14} />
          <span>Voir le projet</span>
          <ExternalLink size={12} />
        </a>
      )}
    </motion.div>
  );
}
