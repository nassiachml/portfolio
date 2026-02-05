"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Copy, RefreshCw, Check, Palette } from "lucide-react";

interface Palette {
  id: number;
  name: string;
  colors: string[];
}

export default function PaletteGeneratorPage() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch("/palettes-data.json")
      .then((res) => res.json())
      .then((data) => {
        setPalettes(data);
        setCurrentPalette(data[Math.floor(Math.random() * data.length)]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const generateRandomPalette = () => {
    const randomColors: string[] = [];
    for (let i = 0; i < 5; i++) {
      randomColors.push(
        `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase()}`
      );
    }
    setCurrentPalette({
      id: Date.now(),
      name: "Palette Aléatoire",
      colors: randomColors,
    });
  };

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setShowNotification(true);
    setTimeout(() => {
      setCopiedIndex(null);
      setShowNotification(false);
    }, 2000);
  };

  const selectPalette = (palette: Palette) => {
    setCurrentPalette(palette);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Chargement des palettes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-6"
          >
            <Palette className="w-16 h-16 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Générateur de Palettes
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Créez et explorez des palettes de couleurs harmonieuses
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Link
              href="/#portfolio"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all"
            >
              ← Retour au portfolio
            </Link>
            <motion.button
              onClick={generateRandomPalette}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Générer aléatoirement
            </motion.button>
          </div>
        </motion.div>

        {/* Current Palette Display */}
        {currentPalette && (
          <motion.div
            key={currentPalette.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {currentPalette.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {currentPalette.colors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-2xl"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color, index)}
                >
                  <div className="aspect-square flex flex-col justify-between p-6">
                    <div className="text-white/0 group-hover:text-white transition-colors">
                      <motion.div
                        animate={{ scale: copiedIndex === index ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-8 h-8" />
                        ) : (
                          <Copy className="w-8 h-8" />
                        )}
                      </motion.div>
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-mono text-sm font-bold">
                        {color}
                      </p>
                      <p className="text-white/80 text-xs mt-1">
                        {copiedIndex === index ? "Copié !" : "Cliquer pour copier"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Palette Library */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Bibliothèque de Palettes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {palettes.map((palette, paletteIndex) => (
              <motion.div
                key={palette.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: paletteIndex * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => selectPalette(palette)}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 shadow-xl cursor-pointer group"
              >
                <div className="grid grid-cols-5 h-32">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      style={{ backgroundColor: color }}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-center">
                    {palette.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3"
            >
              <Check className="w-5 h-5" />
              <span className="font-semibold">Code couleur copié !</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

