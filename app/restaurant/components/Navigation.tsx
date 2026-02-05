"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const { user, isAdmin, logout, getCartItemsCount, favorites } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/restaurant");
    setMobileMenuOpen(false);
  };

  const cartCount = getCartItemsCount();
  const favoritesCount = favorites.length;

  return (
    <>
      <nav className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white sticky top-0 z-50 shadow-lg border-b-2 border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/restaurant" className="flex items-center gap-3 group">
              <div className="text-3xl font-bold tracking-tight group-hover:scale-105 transition-transform">
                🌸 SAKURA
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/restaurant"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/restaurant"
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "text-white/90 hover:text-yellow-300"
                }`}
              >
                Accueil
              </Link>
              <Link
                href="/restaurant/menu"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/restaurant/menu"
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "text-white/90 hover:text-yellow-300"
                }`}
              >
                Menu
              </Link>
              <Link
                href="/restaurant/reservation"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/restaurant/reservation"
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "text-white/90 hover:text-yellow-300"
                }`}
              >
                Réservation
              </Link>
              <Link
                href="/restaurant/order"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/restaurant/order"
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "text-white/90 hover:text-yellow-300"
                }`}
              >
                Commander
              </Link>
              <Link
                href="/restaurant/about"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/restaurant/about"
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "text-white/90 hover:text-yellow-300"
                }`}
              >
                À propos
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="/restaurant/favorites"
                className="relative text-white hover:text-yellow-300 transition-colors hidden md:block"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-red-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link
                href="/restaurant/cart"
                className="relative text-white hover:text-yellow-300 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-red-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  {isAdmin ? (
                    <Link
                      href="/restaurant/admin"
                      className="text-sm font-medium uppercase tracking-wider text-yellow-300 hover:text-yellow-200"
                    >
                      Admin
                    </Link>
                  ) : (
                    <Link
                      href="/restaurant/profile"
                      className="text-white hover:text-yellow-300 transition-colors"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-white/80 hover:text-yellow-300 transition-colors text-sm uppercase tracking-wider hidden md:block"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <Link
                  href="/restaurant/login"
                  className="text-sm font-medium uppercase tracking-wider text-white hover:text-yellow-300 transition-colors"
                >
                  Connexion
                </Link>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-red-900 border-t border-red-700">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/restaurant"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-white"
              >
                Accueil
              </Link>
              <Link
                href="/restaurant/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-white"
              >
                Menu
              </Link>
              <Link
                href="/restaurant/reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-white"
              >
                Réservation
              </Link>
              <Link
                href="/restaurant/order"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-white"
              >
                Commander
              </Link>
              <Link
                href="/restaurant/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-white"
              >
                À propos
              </Link>
              <Link
                href="/restaurant/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-white"
              >
                Favoris
              </Link>
              {user ? (
                <>
                  {isAdmin ? (
                    <Link
                      href="/restaurant/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-medium uppercase tracking-wider text-yellow-300"
                    >
                      Admin
                    </Link>
                  ) : (
                    <Link
                      href="/restaurant/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-medium uppercase tracking-wider text-white"
                    >
                      Mon Compte
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm font-medium uppercase tracking-wider text-white/80"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  href="/restaurant/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium uppercase tracking-wider text-white"
                >
                  Connexion
                </Link>
              )}
              <Link
                href="/#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-white/60 pt-4 border-t border-red-700"
              >
                ← Retour
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

