"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight } from "lucide-react";

interface StartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (email: string, newsletter: boolean) => void;
}

export default function StartModal({ isOpen, onClose, onContinue }: StartModalProps) {
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Veuillez entrer votre email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Veuillez entrer un email valide");
      return;
    }
    setError("");
    onContinue(email, newsletter);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>

              <div className="mb-6">
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  Commencez gratuitement
                </h2>
                <p className="text-gray-600">
                  Créez votre compte en quelques secondes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="votre.email@exemple.com"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Recevoir des conseils de productivité et des mises à jour
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Continuer
                  <ArrowRight size={20} />
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-4">
                Démo fictive – aucune donnée n'est enregistrée
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
