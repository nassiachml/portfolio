"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  color: string;
}

interface ArtistCarouselProps {
  artists: Artist[];
}

export default function ArtistCarousel({ artists }: ArtistCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % artists.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {artists.map((artist, index) => {
            if (index !== currentIndex) return null;
            
            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex-1 min-w-0"
              >
                <div 
                  className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 relative overflow-hidden"
                  style={{
                    boxShadow: `0 0 40px ${artist.color}20`,
                  }}
                >
                  <div 
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: artist.color }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{artist.name}</h3>
                        <p className="text-white/60">{artist.specialty}</p>
                      </div>
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${artist.color}20` }}
                      >
                        <Info className="w-6 h-6" style={{ color: artist.color }} />
                      </div>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed">{artist.bio}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
