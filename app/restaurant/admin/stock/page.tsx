"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRestaurant } from "../../context/RestaurantContext";
import { useRouter } from "next/navigation";
import { Package, AlertTriangle, CheckCircle, XCircle, Plus, Minus, Search, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Dish {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  stock?: number;
}

export default function StockPage() {
  const { user, isAdmin } = useRestaurant();
  const router = useRouter();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/restaurant/login");
      return;
    }

    fetch("/restaurant-data.json")
      .then((res) => res.json())
      .then((data) => {
        // Ajouter un stock fictif à chaque plat
        const dishesWithStock = data.dishes.map((dish: Dish) => ({
          ...dish,
          stock: dish.stock || Math.floor(Math.random() * 50) + 1, // Stock entre 1 et 50
        }));
        setDishes(dishesWithStock);
        setFilteredDishes(dishesWithStock);
      });
  }, [user, isAdmin, router]);

  useEffect(() => {
    let filtered = dishes;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDishes(filtered);
  }, [searchTerm, selectedCategory, dishes]);

  const updateStock = (dishId: number, newStock: number) => {
    setDishes((prev) =>
      prev.map((dish) =>
        dish.id === dishId
          ? { ...dish, stock: Math.max(0, newStock), available: newStock > 0 }
          : dish
      )
    );
  };

  const toggleAvailability = (dishId: number) => {
    setDishes((prev) =>
      prev.map((dish) =>
        dish.id === dishId ? { ...dish, available: !dish.available } : dish
      )
    );
  };

  if (!user || !isAdmin) {
    return null;
  }

  const categories = [
    { id: "all", name: "Tous" },
    { id: "sushis", name: "Sushis" },
    { id: "makis", name: "Makis" },
    { id: "plats", name: "Plats" },
    { id: "entrees", name: "Entrées" },
    { id: "desserts", name: "Desserts" },
    { id: "boissons", name: "Boissons" },
  ];

  const stats = {
    total: dishes.length,
    inStock: dishes.filter((d) => (d.stock || 0) > 0).length,
    lowStock: dishes.filter((d) => (d.stock || 0) > 0 && (d.stock || 0) < 10).length,
    outOfStock: dishes.filter((d) => (d.stock || 0) === 0).length,
    unavailable: dishes.filter((d) => !d.available).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-red-900">Gestion du Stock</h1>
          <Link
            href="/restaurant/admin"
            className="px-6 py-3 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
          >
            Retour
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-red-100">
            <Package className="w-6 h-6 text-red-800 mb-2" />
            <p className="text-xs text-gray-600 mb-1">Total produits</p>
            <p className="text-2xl font-bold text-red-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-green-100">
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-xs text-gray-600 mb-1">En stock</p>
            <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-yellow-100">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
            <p className="text-xs text-gray-600 mb-1">Stock faible</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-red-100">
            <XCircle className="w-6 h-6 text-red-600 mb-2" />
            <p className="text-xs text-gray-600 mb-1">Rupture</p>
            <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-100">
            <XCircle className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-xs text-gray-600 mb-1">Indisponible</p>
            <p className="text-2xl font-bold text-gray-600">{stats.unavailable}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 font-bold uppercase tracking-wider text-sm transition-colors rounded-lg ${
                    selectedCategory === cat.id
                      ? "bg-red-800 text-white"
                      : "bg-white text-red-800 border-2 border-red-800 hover:bg-red-50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-red-100">
          <h2 className="text-2xl font-bold text-red-900 mb-6">Produits ({filteredDishes.length})</h2>
          <div className="space-y-4">
            {filteredDishes.map((dish, index) => {
              const isLowStock = (dish.stock || 0) > 0 && (dish.stock || 0) < 10;
              const isOutOfStock = (dish.stock || 0) === 0;
              
              return (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-2 rounded-lg p-6 ${
                    isOutOfStock
                      ? "border-red-300 bg-red-50"
                      : isLowStock
                      ? "border-yellow-300 bg-yellow-50"
                      : !dish.available
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex gap-6">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover rounded"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-red-900 mb-1">{dish.name}</h3>
                          <p className="text-sm text-gray-600">{dish.description}</p>
                          <p className="text-sm text-gray-500 mt-1">Catégorie : {dish.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {isOutOfStock && (
                            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded">
                              Rupture
                            </span>
                          )}
                          {isLowStock && !isOutOfStock && (
                            <span className="px-3 py-1 bg-yellow-600 text-white text-xs font-bold uppercase rounded">
                              Stock faible
                            </span>
                          )}
                          {!dish.available && (
                            <span className="px-3 py-1 bg-gray-600 text-white text-xs font-bold uppercase rounded">
                              Indisponible
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">Stock :</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateStock(dish.id, (dish.stock || 0) - 1)}
                              className="w-8 h-8 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              value={dish.stock || 0}
                              onChange={(e) => updateStock(dish.id, parseInt(e.target.value) || 0)}
                              className="w-16 text-center border-2 border-gray-300 rounded font-bold text-black bg-white"
                              min="0"
                            />
                            <button
                              onClick={() => updateStock(dish.id, (dish.stock || 0) + 1)}
                              className="w-8 h-8 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleAvailability(dish.id)}
                          className={`px-4 py-2 font-bold uppercase tracking-wider text-sm rounded-lg transition-colors ${
                            dish.available
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-gray-600 text-white hover:bg-gray-700"
                          }`}
                        >
                          {dish.available ? "Disponible" : "Indisponible"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

