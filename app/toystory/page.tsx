"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
  stats: {
    vie: number;
    discretion: number;
    action: number;
  };
  color: string;
}

export default function ToyStoryPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoRotation, setLogoRotation] = useState(0);

  useEffect(() => {
    fetch("/toystory-data.json")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const handleLogoHover = () => {
    setLogoRotation((prev) => prev + 360);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Chargement des personnages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            onMouseEnter={handleLogoHover}
            className="inline-block mb-6"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-4"
              animate={{ rotate: logoRotation }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              🎬
            </motion.h1>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Toy Story
          </h2>
          <p className="text-xl text-gray-200 mb-6">
            Découvrez les personnages emblématiques
          </p>
          <Link
            href="/#portfolio"
            className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all"
          >
            ← Retour au portfolio
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-xl cursor-pointer group"
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br"
                  style={{
                    background: `linear-gradient(135deg, ${character.color}40, ${character.color}80)`,
                  }}
                />
                <motion.img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {character.name}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-gray-200 mb-6 min-h-[60px]">
                  {character.description}
                </p>

                {/* Stats */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Vie</span>
                      <span className="text-sm font-semibold text-white">
                        {character.stats.vie}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${character.stats.vie}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        className="bg-red-500 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Discrétion</span>
                      <span className="text-sm font-semibold text-white">
                        {character.stats.discretion}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${character.stats.discretion}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                        className="bg-blue-500 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Action</span>
                      <span className="text-sm font-semibold text-white">
                        {character.stats.action}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${character.stats.action}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                        className="bg-yellow-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

