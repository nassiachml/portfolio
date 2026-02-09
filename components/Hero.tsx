"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Phone, MapPin } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToNext = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-bordeaux-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,29,29,0.1),transparent_50%)]" />

      {/* Animated circles - Mix bordeaux et cyan */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-bordeaux-900/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-800/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Nassia </span>
            <span className="text-gradient">Chemlal</span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-4xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Développeuse Fullstack Junior
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Sérieuse et dynamique, actuellement en 3ème année en BUT Métiers du
            Multimédia et de l'Internet à Troyes. À la recherche d'un stage de
            14 semaines en développement web Full Stack à partir de mars 2026.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="tel:+3366611306"
              className="flex items-center gap-2 text-gray-300 hover:text-bordeaux-400 transition-colors"
            >
              <Phone size={18} />
              <span>07 66 61 13 06</span>
            </a>
            <a
              href="mailto:nassia.chemlal@gmail.com"
              className="flex items-center gap-2 text-gray-300 hover:text-bordeaux-400 transition-colors"
            >
              <Mail size={18} />
              <span>nassia.chemlal@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin size={18} />
              <span>Troyes et alentours, Genève</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector("#portfolio");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-4 bg-gradient-bordeaux rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-bordeaux-900/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir mon Portfolio
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-4 glass rounded-lg font-semibold text-white hover:border-bordeaux-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Me Contacter
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowDown size={32} className="text-bordeaux-400" />
        </motion.button>
      </div>
    </section>
  );
}

