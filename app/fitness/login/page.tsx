"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFitness } from "../context/FitnessContext";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login, users, loginWithUser } = useFitness();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      router.push("/fitness/dashboard");
    } else {
      setError("Email ou mot de passe incorrect. Utilisez un compte de démo ci-dessous.");
    }
  };

  const handleDemoUser = (email: string) => {
    const u = users.find((x) => x.email === email);
    if (u) {
      loginWithUser(u);
      router.push("/fitness/dashboard");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-wellness-off-white rounded-2xl border border-wellness-sage/20 p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-medium text-wellness-brown tracking-tight">Connexion</h1>
            <p className="text-wellness-brown/60 mt-2 text-sm">Accédez à votre tableau de bord</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-wellness-brown/80 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-wellness-sage/25 focus:ring-2 focus:ring-wellness-sage/40 focus:border-wellness-sage outline-none transition duration-300 bg-wellness-beige/30"
                placeholder="vous@mail.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-wellness-brown/80 mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-wellness-sage/25 focus:ring-2 focus:ring-wellness-sage/40 focus:border-wellness-sage outline-none transition duration-300 bg-wellness-beige/30"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-wellness-brown/80">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-wellness-brown text-wellness-off-white font-medium rounded-xl hover:bg-wellness-brown/90 transition-colors duration-300"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-wellness-sage/20">
            <p className="text-sm text-wellness-brown/50 mb-3">Comptes de démo (cliquez pour vous connecter) :</p>
            <div className="space-y-2">
              {users.slice(0, 5).map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleDemoUser(u.email)}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-wellness-beige/50 hover:bg-wellness-sage/10 text-wellness-brown/80 hover:text-wellness-brown text-sm font-medium transition-colors duration-300"
                >
                  {u.name} — {u.email}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-wellness-brown/50 text-sm mt-8">
          <Link href="/" className="text-wellness-sage-muted hover:text-wellness-brown transition-colors duration-300">
            ← Retour au portfolio
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
