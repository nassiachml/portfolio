"use client";

import { motion } from "framer-motion";
import { Clock, Heart } from "lucide-react";
import type { Article } from "../../conseils/data/articles";

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export default function ArticleCard({
  article,
  onClick,
  index = 0,
  isFavorite = false,
  onToggleFavorite,
}: ArticleCardProps) {
  const tagLabel = article.tag === "nutrition" ? "Nutrition" : "Motivation";
  const tagColor =
    article.tag === "nutrition"
      ? "bg-wellness-sage/15 text-wellness-sage-muted"
      : "bg-wellness-brown/10 text-wellness-brown/80";

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="relative bg-wellness-off-white rounded-2xl border border-wellness-sage/20 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-5">
          <span className="text-2xl flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-wellness-sage/15 text-wellness-sage-muted group-hover:bg-wellness-sage/25 transition-colors duration-500">
            {article.icon}
          </span>
          <div className="flex-1 min-w-0 pr-8">
            <span
              className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${tagColor}`}
            >
              {tagLabel}
            </span>
            <h2 className="font-serif text-lg font-medium text-wellness-brown tracking-tight group-hover:text-wellness-brown/90 transition-colors duration-300 line-clamp-2 leading-snug">
              {article.title}
            </h2>
            <div className="flex items-center gap-1.5 mt-3 text-wellness-brown/50 text-sm">
              <Clock className="w-4 h-4 opacity-70" />
              <span>{article.readTime} min de lecture</span>
            </div>
          </div>
        </div>
      </div>
      {onToggleFavorite && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(e);
          }}
          className="absolute top-5 right-5 z-10 p-2 rounded-full text-wellness-brown/40 hover:text-wellness-brown/70 transition-colors duration-300"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? "fill-wellness-sage-muted text-wellness-sage-muted" : ""}`}
          />
        </button>
      )}
    </motion.article>
  );
}
