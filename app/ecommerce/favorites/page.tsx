"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "../context/StoreContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/fashion-data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFavoriteProducts(
          data.products.filter((p: Product) => favorites.includes(p.id))
        );
      });
  }, [favorites]);

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tighter">
            MES FAVORIS
          </h1>
          <p className="text-gray-600 mb-8 uppercase tracking-wider">
            Aucun article en favoris pour le moment
          </p>
          <Link
            href="/ecommerce/products"
            className="inline-block px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            MES FAVORIS
          </h1>
          <p className="text-gray-400 uppercase tracking-wider text-sm">
            {favoriteProducts.length} article(s)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <Link href={`/ecommerce/products/${product.id}`}>
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-black uppercase">
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
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
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
      </div>
    </div>
  );
}

