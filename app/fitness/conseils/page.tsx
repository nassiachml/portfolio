"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroMotivation from "../components/conseils/HeroMotivation";
import ArticleCard from "../components/conseils/ArticleCard";
import ArticleModal from "../components/conseils/ArticleModal";
import DailyTip from "../components/conseils/DailyTip";
import ProgressBar from "../components/conseils/ProgressBar";
import StatsBlock from "../components/conseils/StatsBlock";
import QuizExpress from "../components/conseils/QuizExpress";
import { articles } from "./data/articles";
import { useUserStats } from "./hooks/useUserStats";
import { useFavorites } from "./hooks/useFavorites";
import { sortArticlesByRelevance } from "./utils/personalize";
import type { Article, ArticleTag } from "./data/articles";

type Filter = "all" | ArticleTag;

export default function ConseilsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const stats = useUserStats();
  const { favoriteIds, toggle: toggleFavorite, isFavorite } = useFavorites();

  const filtered = useMemo(() => {
    let list = filter === "all" ? articles : articles.filter((a) => a.tag === filter);
    list = sortArticlesByRelevance(list, stats);
    return list;
  }, [filter, stats]);

  const filteredWithoutFavorites = useMemo(
    () => filtered.filter((a) => !favoriteIds.includes(a.id)),
    [filtered, favoriteIds]
  );

  const favoriteArticles = useMemo(
    () => articles.filter((a) => favoriteIds.includes(a.id)),
    [favoriteIds]
  );

  return (
    <>
      <ProgressBar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <HeroMotivation />

          {/* Bloc statistiques dynamique */}
          <StatsBlock stats={stats} />

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {(["all", "nutrition", "motivation"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 ${
                  filter === f
                    ? "bg-wellness-brown text-wellness-off-white"
                    : "bg-wellness-off-white border border-wellness-sage/25 text-wellness-brown/70 hover:bg-wellness-sage/10 hover:text-wellness-brown"
                }`}
              >
                {f === "all" ? "Tous" : f === "nutrition" ? "Nutrition" : "Motivation"}
              </button>
            ))}
          </div>

          {/* Mes articles préférés */}
          {favoriteArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-lg font-medium text-wellness-brown tracking-tight flex items-center gap-2">
                <span className="text-wellness-sage-muted">—</span> Mes articles préférés
              </h2>
              <div className="grid gap-4 sm:gap-5">
                {favoriteArticles.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={i}
                    onClick={() => setSelectedArticle(article)}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(article.id)}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Cartes articles */}
          <section>
            <h2 className="sr-only">Articles</h2>
            <div className="grid gap-4 sm:gap-5">
              {filteredWithoutFavorites.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={i}
                  onClick={() => setSelectedArticle(article)}
                  isFavorite={isFavorite(article.id)}
                  onToggleFavorite={() => toggleFavorite(article.id)}
                />
              ))}
            </div>
          </section>

          {/* Astuce du jour */}
          <DailyTip />

          {/* Quiz express */}
          <QuizExpress stats={stats} />

          {/* CTA vers stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl bg-wellness-sage/10 border border-wellness-sage/20 p-8 text-center"
            >
              <p className="text-wellness-brown/80 font-medium mb-4">
                Ta trace, tes séances. En douceur.
              </p>
              <Link
                href="/fitness"
                className="inline-flex items-center justify-center px-6 py-3 bg-wellness-brown text-wellness-off-white rounded-xl font-medium hover:bg-wellness-brown/90 transition-colors duration-300"
              >
                Tableau de bord
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        stats={stats}
      />
    </>
  );
}
