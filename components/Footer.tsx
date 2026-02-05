"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-400 flex items-center gap-2 justify-center md:justify-start">
              Made with <Heart className="text-bordeaux-500" size={16} /> by
              Nassia Chemlal
            </p>
            <p className="text-sm text-gray-500 mt-1">
              © {currentYear} Tous droits réservés
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <a
              href="mailto:nassia.chemlal@gmail.com"
              className="p-2 glass rounded-lg hover:border-bordeaux-600 transition-all"
              aria-label="Email"
            >
              <Mail className="text-gray-400 hover:text-bordeaux-400 transition-colors" size={20} />
            </a>
            <a
              href="tel:+3366611306"
              className="p-2 glass rounded-lg hover:border-bordeaux-600 transition-all"
              aria-label="Téléphone"
            >
              <Phone className="text-gray-400 hover:text-bordeaux-400 transition-colors" size={20} />
            </a>
            <a
              href="https://linkedin.com/in/nassia-chemlal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg hover:border-bordeaux-600 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="text-gray-400 hover:text-bordeaux-400 transition-colors" size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

