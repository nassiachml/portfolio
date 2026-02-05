"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Mockup {
  id: string;
  title: string;
  type: string;
  image: string;
  description: string;
}

interface MockupGalleryProps {
  mockups: Mockup[];
}

export default function MockupGallery({ mockups }: MockupGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextMockup = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % mockups.length);
    }
  };

  const prevMockup = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + mockups.length) % mockups.length);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockups.map((mockup, index) => (
          <motion.div
            key={mockup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4" />
                    <p className="text-sm text-gray-600 font-semibold">{mockup.type}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{mockup.title}</h3>
                <p className="text-sm text-gray-500">{mockup.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
              <button
                onClick={prevMockup}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextMockup}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-xl mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">{mockups[selectedIndex].type}</p>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {mockups[selectedIndex].title}
                </h2>
                <p className="text-gray-600">{mockups[selectedIndex].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
