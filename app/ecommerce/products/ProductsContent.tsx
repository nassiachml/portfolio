"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useStore } from "../context/StoreContext";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductSkeleton from "../components/ProductSkeleton";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  gender: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
}

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const { toggleFavorite, isFavorite } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.get("category") || "all"
  );
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("search") || ""
  );
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/fashion-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setCategories(data.categories);
        const maxPrice = Math.max(...data.products.map((p: Product) => p.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
      })
      .catch((err) => {
        setError("Impossible de charger les produits. Veuillez réessayer.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filtre par prix
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Tri
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortOption, priceRange, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Black Friday Banner */}
      <section className="bg-red-600 text-white py-2 px-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-xl md:text-2xl font-black tracking-tighter">
              BLACK FRIDAY
            </span>
            <span className="text-sm md:text-lg font-bold">
              JUSQU'À -55% SUR TOUTE LA COLLECTION
            </span>
            <span className="text-xs md:text-sm bg-white text-red-600 px-3 py-0.5 font-bold uppercase">
              OFFRE LIMITÉE
            </span>
          </div>
        </motion.div>
      </section>

      {/* Header */}
      <div className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">
            COLLECTION
          </h1>
          <p className="text-gray-400 uppercase tracking-wider text-xs mb-3">
            Style oversized pour tous
          </p>
          <div className="max-w-3xl">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-white font-bold">100% UNISEXE</span> - Notre collection est pensée pour être portée par tous, sans distinction de genre. Des coupes oversized qui s'adaptent à chaque silhouette, des designs intemporels qui transcendent les codes traditionnels de la mode.
            </p>
          </div>
        </div>
      </div>

      {/* Storytelling Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-6 tracking-tighter">
            UNE MODE SANS FRONTIÈRES
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Chez URBAN EDGE, nous croyons que la mode n'a pas de genre. Chaque pièce de notre collection est conçue pour être portée par tous, créant une communauté où l'expression personnelle prime sur les conventions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nos vêtements oversized sont pensés pour s'adapter à toutes les morphologies, offrant confort et style à ceux qui osent être authentiques. Rejoignez un mouvement où la diversité est célébrée et où chacun peut trouver sa place.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: "Collection", href: "/ecommerce/products" },
          ]}
        />

        {/* Search and Filters Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-black"
              />
            </div>

            {/* Sort */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-black bg-white"
            >
              <option value="default">Trier par</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
            </select>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border border-gray-300 hover:border-black transition-colors flex items-center gap-2 text-black font-bold uppercase tracking-wider text-sm"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtres
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-gray-200 p-6 bg-gray-50"
            >
              <div className="mb-4">
                <label className="block text-sm font-bold uppercase tracking-wider text-black mb-2">
                  Prix : {priceRange[0]}€ - {priceRange[1]}€
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${
                selectedCategory === cat.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/ecommerce/products/${product.id}`}>
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-black uppercase z-10">
                          BLACK FRIDAY
                          <br />
                          -{Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}%
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-20"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isFavorite(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-black"
                          }`}
                        />
                      </button>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                          <span className="text-white font-bold uppercase tracking-wider">
                            Épuisé
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-1 uppercase tracking-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            {product.originalPrice}€
                          </span>
                        )}
                        <span className="font-bold text-red-600">
                          {product.price}€
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-black transition-colors text-black"
                >
                  Précédent
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 border transition-colors ${
                          currentPage === page
                            ? "bg-black text-white border-black"
                            : "border-gray-300 text-black hover:border-black"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-black transition-colors text-black"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Aucun produit trouvé
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-black hover:underline"
              >
                Effacer la recherche
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

