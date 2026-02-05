"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Quote, RefreshCw, Copy, Check, Sparkles } from "lucide-react";

interface QuoteData {
  id: number;
  text: string;
  author: string;
  category: string;
}

const categories = ["toutes", "motivation", "développement", "design", "travail", "créativité", "apprentissage"];

export default function QuoteGeneratorPage() {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [currentQuote, setCurrentQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("toutes");

  useEffect(() => {
    fetch("/quotes-data.json")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const getRandomQuote = () => {
    const filtered = selectedCategory === "toutes" 
      ? quotes 
      : quotes.filter(q => q.category === selectedCategory);
    
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setCurrentQuote(filtered[randomIndex]);
    }
  };

  const copyToClipboard = () => {
    if (currentQuote) {
      const textToCopy = `"${currentQuote.text}" - ${currentQuote.author}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600 text-xl">Chargement des citations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            href="/#portfolio"
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            ← Retour au portfolio
          </Link>
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-light">Générateur de Citations</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">
            Citations Inspirantes
          </h1>
          <p className="text-slate-500 text-lg font-light">
            Découvrez des pensées qui inspirent
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-light transition-all capitalize ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quote Display */}
        <AnimatePresence mode="wait">
          {currentQuote && (
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 md:p-16 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-200 to-transparent" />
                <div className="absolute top-8 right-8 text-slate-100">
                  <Quote className="w-24 h-24" />
                </div>

                {/* Quote Content */}
                <div className="relative z-10">
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-light text-slate-800 leading-relaxed mb-8 italic"
                  >
                    "{currentQuote.text}"
                  </motion.blockquote>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between pt-8 border-t border-slate-100"
                  >
                    <div>
                      <p className="text-slate-600 font-medium text-lg">
                        {currentQuote.author}
                      </p>
                      <p className="text-slate-400 text-sm font-light mt-1 capitalize">
                        {currentQuote.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={copyToClipboard}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Copier la citation"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <motion.button
            onClick={getRandomQuote}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-light text-lg hover:bg-slate-800 transition-colors shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Nouvelle citation</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm font-light">
            {quotes.length} citations disponibles
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-xs font-light">
            Trouvez l'inspiration dans chaque mot
          </p>
        </div>
      </footer>
    </div>
  );
}

