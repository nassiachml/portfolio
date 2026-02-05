"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (user) {
      if (redirect === "checkout") {
        router.push("/ecommerce/checkout");
      } else if (user.isAdmin) {
        router.push("/ecommerce/admin");
      } else {
        router.push("/ecommerce/profile");
      }
    }
  }, [user, redirect, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const success = login(email, password);
    if (success) {
      if (redirect === "checkout") {
        router.push("/ecommerce/checkout");
      } else {
        router.push("/ecommerce");
      }
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-300 p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-2 tracking-tighter">
              CONNEXION
            </h1>
            <p className="text-gray-600 uppercase tracking-wider text-sm">
              Accédez à votre compte
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-black mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors text-black placeholder-gray-500"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-black mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors text-black placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-black text-center mb-4 font-bold uppercase tracking-wider">
              Comptes de démonstration :
            </p>
            <div className="bg-gray-50 border border-gray-200 p-4 space-y-3 text-sm">
              <div>
                <span className="font-bold text-black">Admin :</span>
                <div className="mt-1 text-gray-700">
                  admin@urbanedge.com / admin123
                </div>
              </div>
              <div>
                <span className="font-bold text-black">Client :</span>
                <div className="mt-1 text-gray-700">
                  client@urbanedge.com / client123
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/ecommerce"
              className="text-gray-600 hover:text-black text-sm uppercase tracking-wider"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
