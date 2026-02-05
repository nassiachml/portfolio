"use client";

import { motion } from "framer-motion";

interface MoodboardImage {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface MoodboardGridProps {
  images: MoodboardImage[];
}

export default function MoodboardGrid({ images }: MoodboardGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          className="group"
        >
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-500">
            <div className="aspect-[4/5] bg-gradient-to-br from-amber-50 via-stone-50 to-green-50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center w-full">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-green-100 rounded-2xl mx-auto mb-4 shadow-inner" />
                  <p className="text-xs text-amber-700 font-semibold mb-2 uppercase tracking-wider">
                    {image.category}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">{image.title}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-black/0 transition-all duration-500" />
            </div>
            <div className="p-5">
              <h3 className="font-medium text-gray-800 mb-1">{image.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{image.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
