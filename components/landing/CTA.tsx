"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

interface CTAProps {
  onStartClick: () => void;
}

export default function CTA({ onStartClick }: CTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Prêt à reprendre le contrôle de votre temps ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez plus de 2 500 freelances qui ont déjà transformé leur façon de travailler avec Flowly.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartClick}
            className="px-10 py-5 bg-white text-gray-900 font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 text-lg mx-auto mb-8"
          >
            Essayer Flowly gratuitement
            <ArrowRight size={24} />
          </motion.button>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Check size={18} />
              <span>Essai gratuit de 14 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} />
              <span>Aucune carte bancaire</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} />
              <span>Annulation à tout moment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
