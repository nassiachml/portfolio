"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, User } from "lucide-react";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  type: "peinture" | "sculpture" | "installation";
  description: string;
  quote: string;
  color: string;
}

interface ArtworkExplorerProps {
  artworks: Artwork[];
}

export default function ArtworkExplorer({ artworks }: ArtworkExplorerProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<"all" | "peinture" | "sculpture" | "installation">("all");

  const filteredArtworks = filter === "all" 
    ? artworks 
    : artworks.filter(a => a.type === filter);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: "all", label: "Toutes" },
          { id: "peinture", label: "Peinture" },
          { id: "sculpture", label: "Sculpture" },
          { id: "installation", label: "Installation" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === f.id
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setSelectedArtwork(artwork)}
            className="group cursor-pointer"
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all overflow-hidden">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-2xl"
                style={{ backgroundColor: artwork.color }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-white/60">
                    {artwork.type}
                  </span>
                  <Sparkles className="w-5 h-5 text-white/40" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{artwork.title}</h3>
                <p className="text-white/70 mb-4">{artwork.artist}</p>
                
                <div className="h-48 bg-gradient-to-br from-white/10 to-transparent rounded-lg flex items-center justify-center mb-4">
                  <div className="text-6xl">🎨</div>
                </div>
                
                <p className="text-sm text-white/60 line-clamp-2">{artwork.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={() => setSelectedArtwork(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black rounded-2xl max-w-4xl w-full p-8 border border-white/20 relative">
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <div 
                      className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-4"
                      style={{ 
                        boxShadow: `0 0 60px ${selectedArtwork.color}40`,
                        border: `2px solid ${selectedArtwork.color}40`
                      }}
                    >
                      <div className="text-8xl">🎨</div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-wider text-white/60">
                        {selectedArtwork.type}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">{selectedArtwork.title}</h2>
                    <div className="flex items-center gap-2 mb-6">
                      <User className="w-5 h-5 text-white/60" />
                      <p className="text-xl text-white/80">{selectedArtwork.artist}</p>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed mb-6">
                      {selectedArtwork.description}
                    </p>

                    <div className="p-6 bg-white/5 rounded-xl border-l-4" style={{ borderColor: selectedArtwork.color }}>
                      <p className="text-white/90 italic text-lg leading-relaxed">
                        "{selectedArtwork.quote}"
                      </p>
                      <p className="text-white/60 text-sm mt-2">— {selectedArtwork.artist}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
