"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Dumbbell, Target, Repeat, Users, User, LogOut, Menu, X, Apple, ShoppingCart, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useFitness } from "../context/FitnessContext";
import { motion } from "framer-motion";

const navItems = [
  { href: "/fitness/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/fitness/sessions", label: "Séances", icon: Dumbbell },
  { href: "/fitness/nutrition", label: "Nutrition", icon: Apple },
  { href: "/fitness/conseils", label: "Conseils", icon: Lightbulb },
  { href: "/fitness/goals", label: "Objectifs", icon: Target },
  { href: "/fitness/routines", label: "Routines", icon: Repeat },
  { href: "/fitness/coaches", label: "Coachs", icon: Users },
  { href: "/fitness/profile", label: "Profil", icon: User },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, coachCart } = useFitness();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = coachCart.length;

  const handleLogout = () => {
    logout();
    router.push("/fitness");
    setMobileOpen(false);
  };

  if (!user) {
    return (
      <nav className="bg-wellness-off-white/95 backdrop-blur-md border-b border-wellness-sage/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/fitness" className="flex items-center gap-2 text-wellness-brown font-serif text-xl font-medium tracking-tight">
              <span className="text-wellness-sage text-lg">—</span>
              FitTrack
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/fitness/conseils"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-wellness-brown/70 hover:text-wellness-brown hover:bg-wellness-sage/10 rounded-lg text-sm font-medium transition-colors duration-300"
              >
                <Lightbulb className="w-4 h-4 opacity-80" />
                Conseils
              </Link>
              <Link
                href="/fitness/login"
                className="px-4 py-2.5 text-wellness-brown border border-wellness-sage/40 rounded-lg text-sm font-medium hover:bg-wellness-sage/10 transition-colors duration-500"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-wellness-off-white/95 backdrop-blur-md border-b border-wellness-sage/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/fitness" className="flex items-center gap-2 text-wellness-brown font-serif text-xl font-medium tracking-tight">
            <span className="text-wellness-sage text-lg">—</span>
            FitTrack
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  pathname === href
                    ? "bg-wellness-sage/15 text-wellness-brown"
                    : "text-wellness-brown/70 hover:bg-wellness-sage/10 hover:text-wellness-brown"
                }`}
              >
                <Icon className="w-4 h-4 opacity-80" />
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/fitness/cart"
              className="relative p-2 text-wellness-brown/70 hover:text-wellness-sage rounded-lg transition-colors duration-300"
              title="Panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-0.5 -right-0.5 bg-wellness-sage text-wellness-off-white text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            <span className="text-sm text-wellness-brown/70 truncate max-w-[140px]">{user.name}</span>
            <button
              onClick={handleLogout}
              className="p-2 text-wellness-brown/50 hover:text-wellness-brown rounded-lg transition-colors duration-300"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-wellness-brown/70 hover:bg-wellness-sage/10"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-wellness-sage/20">
            <div className="flex flex-col gap-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                    pathname === href ? "bg-wellness-sage/15 text-wellness-brown" : "text-wellness-brown/70"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <Link
                href="/fitness/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-wellness-brown/70"
              >
                <ShoppingCart className="w-4 h-4" />
                Panier {cartCount > 0 && `(${cartCount})`}
              </Link>
              <div className="flex items-center justify-between px-4 py-3 mt-2 border-t border-wellness-sage/20">
                <span className="text-sm text-wellness-brown/70">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-wellness-brown/70 font-medium"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
