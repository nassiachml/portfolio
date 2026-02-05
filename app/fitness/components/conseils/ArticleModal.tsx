"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Article, ArticleSection } from "../../conseils/data/articles";
import { getPersonalizedContent, getAdaptedCta } from "../../conseils/utils/personalize";
import type { UserStats } from "../../conseils/hooks/useUserStats";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  stats?: UserStats | null;
}

function renderSection(section: ArticleSection, i: number) {
  if (section.type === "intro") {
    return (
      <p key={i} className="text-wellness-brown/80 text-lg leading-relaxed">
        {section.body[0]}
      </p>
    );
  }
  if (section.type === "conclusion") {
    return (
      <div key={i} className="rounded-xl bg-wellness-sage/10 border border-wellness-sage/20 p-5">
        <p className="text-wellness-brown/90 font-medium leading-relaxed">{section.body[0]}</p>
      </div>
    );
  }
  if (section.type === "cta") {
    return null;
  }
  if (section.type === "section") {
    return (
      <div key={i} className="space-y-3">
        {section.title && (
          <h3 className="font-serif text-lg font-medium text-wellness-brown mt-8 first:mt-0 tracking-tight">
            {section.title}
          </h3>
        )}
        {section.body.map((p, j) => (
          <p key={j} className="text-wellness-brown/80 leading-relaxed">
            {p}
          </p>
        ))}
        {section.list?.map((block, k) => (
          <div key={k} className="mt-4 pl-4 border-l-2 border-wellness-sage/30">
            <p className="font-medium text-wellness-brown/90">{block.label}</p>
            <ul className="list-disc list-inside text-wellness-brown/80 space-y-1 mt-1 text-sm">
              {block.items.map((item, l) => (
                <li key={l}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ArticleModal({ article, onClose, stats = null }: ArticleModalProps) {
  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  if (!article) return null;

  const content = getPersonalizedContent(article.content, stats);
  const cta = getAdaptedCta(article.cta, article.ctaHref, stats);

  return (
    <AnimatePresence>
      {article && (
        <>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 bg-wellness-black/40 z-40 backdrop-blur-md"
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-wellness-off-white z-50 overflow-y-auto border-l border-wellness-sage/20"
        >
          <div className="sticky top-0 bg-wellness-off-white/95 backdrop-blur border-b border-wellness-sage/20 px-6 py-5 flex items-center justify-between">
            <span className="text-2xl opacity-80">{article.icon}</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-wellness-brown/50 hover:bg-wellness-sage/10 hover:text-wellness-brown transition-colors duration-300"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 pb-16">
            <span
              className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${
                article.tag === "nutrition"
                  ? "bg-wellness-sage/15 text-wellness-sage-muted"
                  : "bg-wellness-brown/10 text-wellness-brown/80"
              }`}
            >
              {article.tag === "nutrition" ? "Nutrition" : "Motivation"}
            </span>
            <h1 className="font-serif text-2xl font-medium text-wellness-brown mb-8 tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="space-y-6">
              {content.map(renderSection)}
            </div>
            <div className="mt-12 pt-8 border-t border-wellness-sage/20">
              <p className="text-sm font-medium text-wellness-brown/80 mb-4">
                {article.cta}
              </p>
              <Link
                href={cta.href}
                onClick={onClose}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-wellness-brown text-wellness-off-white rounded-xl font-medium hover:bg-wellness-brown/90 transition-colors duration-300"
              >
                {cta.label}
              </Link>
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
