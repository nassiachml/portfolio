"use client";

import Link from "next/link";
import { ShoppingBag, User, LogOut, Menu, X, Search, Heart } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const { user, isAdmin, logout, getCartItemsCount, favorites } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/ecommerce");
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ecommerce/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const cartCount = getCartItemsCount();
  const favoritesCount = favorites.length;

  return (
    <>
      <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-16">
            <Link href="/ecommerce" className="flex items-center gap-3 group">
              <div className="text-2xl font-black tracking-tighter group-hover:scale-105 transition-transform">
                URBAN
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div className="text-2xl font-light tracking-widest">EDGE</div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/ecommerce"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/ecommerce"
                    ? "text-white border-b border-white pb-1"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Accueil
              </Link>
              <Link
                href="/ecommerce/products"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/ecommerce/products"
                    ? "text-white border-b border-white pb-1"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Collection
              </Link>
              <Link
                href="/ecommerce/faq"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === "/ecommerce/faq"
                    ? "text-white border-b border-white pb-1"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                FAQ
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/ecommerce/favorites"
                className="relative text-white hover:text-gray-300 transition-colors hidden md:block"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link
                href="/ecommerce/cart"
                className="relative text-white hover:text-gray-300 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  {isAdmin ? (
                    <Link
                      href="/ecommerce/admin"
                      className="text-sm font-medium uppercase tracking-wider text-pink-400 hover:text-pink-300"
                    >
                      Admin
                    </Link>
                  ) : (
                    <Link
                      href="/ecommerce/profile"
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider hidden md:block"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <Link
                  href="/ecommerce/login"
                  className="text-sm font-medium uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
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

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-gray-800 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/ecommerce"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase tracking-wider text-white"
            >
              Accueil
            </Link>
            <Link
              href="/ecommerce/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase tracking-wider text-white"
            >
              Collection
            </Link>
            <Link
              href="/ecommerce/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase tracking-wider text-white"
            >
              FAQ
            </Link>
            <Link
              href="/ecommerce/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase tracking-wider text-white"
            >
              Favoris
            </Link>
            {user ? (
              <>
                {isAdmin ? (
                  <Link
                    href="/ecommerce/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium uppercase tracking-wider text-pink-400"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    href="/ecommerce/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium uppercase tracking-wider text-white"
                  >
                    Mon Compte
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-sm font-medium uppercase tracking-wider text-gray-400"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/ecommerce/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-white"
              >
                Connexion
              </Link>
            )}
            <Link
              href="/#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-gray-500 pt-4 border-t border-gray-800"
            >
              ← Retour
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
