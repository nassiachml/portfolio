"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRestaurant } from "../context/RestaurantContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useRestaurant();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      router.push("/restaurant");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 border-2 border-red-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">🌸 SAKURA</h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-red-900 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-red-900 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Compte admin: admin@sakura-troyes.fr / admin123</p>
          <p className="mt-2">Compte client: client@sakura-troyes.fr / client123</p>
        </div>
      </motion.div>
    </div>
  );
}

