"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useRestaurant } from "../context/RestaurantContext";
import Link from "next/link";

interface Dish {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  allergens: string[];
  vegetarian: boolean;
  spicy: boolean;
  available: boolean;
}

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useRestaurant();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [favoriteDishes, setFavoriteDishes] = useState<Dish[]>([]);

  useEffect(() => {
    fetch("/restaurant-data.json")
      .then((res) => res.json())
      .then((data) => {
        setDishes(data.dishes);
        setFavoriteDishes(data.dishes.filter((d: Dish) => favorites.includes(d.id)));
      });
  }, [favorites]);

  if (favoriteDishes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-900 mb-4">Aucun favori</h1>
          <Link
            href="/restaurant/menu"
            className="inline-block px-6 py-3 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
          >
            Voir le menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-8">Mes Favoris</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-red-100"
            >
              <div className="relative h-48">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                  onClick={() => toggleFavorite(dish.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <Heart className="w-5 h-5 fill-red-600 text-red-600" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-900 mb-2">{dish.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-800">{dish.price}€</span>
                  <button
                    onClick={() => addToCart(dish)}
                    className="px-6 py-2 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

