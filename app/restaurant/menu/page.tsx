"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, AlertTriangle, Leaf, Flame, Clock, Star, Gift, Percent, ArrowRight, Search, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useRestaurant } from "../context/RestaurantContext";
import { useToast } from "../context/ToastContext";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

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
  preparationTime?: number;
  reviews?: Review[];
}

export default function MenuPage() {
  const { addToCart, toggleFavorite, isFavorite } = useRestaurant();
  const { showToast } = useToast();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false);
  const [showSpicyOnly, setShowSpicyOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc" | "name-desc" | "popularity" | "prep-time">("name-asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("/restaurant-data.json")
      .then((res) => res.json())
      .then((data) => {
        setDishes(data.dishes);
        setFilteredDishes(data.dishes);
        setCategories(data.categories);
      });
  }, []);

  useEffect(() => {
    let filtered = dishes;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }

    if (showVegetarianOnly) {
      filtered = filtered.filter((d) => d.vegetarian);
    }

    if (showSpicyOnly) {
      filtered = filtered.filter((d) => d.spicy);
    }

    setFilteredDishes(filtered);
  }, [selectedCategory, showVegetarianOnly, showSpicyOnly, dishes]);

  const allergenColors: { [key: string]: string } = {
    Poisson: "bg-blue-100 text-blue-800",
    Soja: "bg-green-100 text-green-800",
    Gluten: "bg-yellow-100 text-yellow-800",
    "Œufs": "bg-orange-100 text-orange-800",
    Sésame: "bg-purple-100 text-purple-800",
    Lait: "bg-pink-100 text-pink-800",
  };

  const offers = [
    {
      id: 1,
      title: "Menu Sushi Duo",
      description: "2 assortiments sushis premium pour 2 personnes",
      price: 44.90,
      originalPrice: 49.80,
      discount: 10,
      badge: "Populaire",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Happy Hour Sushi",
      description: "15% de réduction sur tous les sushis entre 14h et 17h",
      discount: 15,
      badge: "Quotidien",
      image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Menu Famille",
      description: "Menu découverte pour 4 personnes avec dessert offert",
      price: 115.90,
      originalPrice: 131.60,
      discount: 12,
      badge: "Famille",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Offres Spéciales */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-8 h-8 text-red-800" />
              <h2 className="text-3xl md:text-4xl font-bold text-red-900">Offres Spéciales</h2>
            </div>
            <p className="text-lg text-gray-600">
              Profitez de nos promotions exclusives
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-red-200 relative"
              >
                <div className="relative h-40">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    -{offer.discount}%
                  </div>
                  <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase">
                    {offer.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-red-900 mb-1">{offer.title}</h3>
                  <p className="text-gray-600 text-xs mb-3">{offer.description}</p>
                  {offer.price && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-red-800">{offer.price}€</span>
                      {offer.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">{offer.originalPrice}€</span>
                      )}
                    </div>
                  )}
                  <Link
                    href="#menu"
                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-red-800 text-white font-bold uppercase tracking-wider hover:bg-red-900 transition-colors rounded-lg text-sm"
                  >
                    Voir le menu
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          id="menu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-4">
            Notre Menu
          </h1>
          <p className="text-gray-600 text-lg">
            Découvrez nos spécialités japonaises préparées avec des ingrédients frais
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors rounded-lg ${
                  selectedCategory === cat.id
                    ? "bg-red-800 text-white"
                    : "bg-white text-red-800 border-2 border-red-800 hover:bg-red-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowVegetarianOnly(!showVegetarianOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                showVegetarianOnly
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 border-2 border-green-600"
              }`}
            >
              <Leaf className="w-4 h-4" />
              Végétarien uniquement
            </button>
            <button
              onClick={() => setShowSpicyOnly(!showSpicyOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                showSpicyOnly
                  ? "bg-red-600 text-white"
                  : "bg-white text-red-600 border-2 border-red-600"
              }`}
            >
              <Flame className="w-4 h-4" />
              Épicé uniquement
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-red-100 cursor-pointer"
              onClick={() => window.location.href = `/restaurant/menu/${dish.id}`}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dish.id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(dish.id)
                        ? "fill-red-600 text-red-600"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                {dish.spicy && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase rounded">
                    🌶️ Épicé
                  </div>
                )}
                {dish.vegetarian && (
                  <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 text-xs font-bold uppercase rounded">
                    🌱 Végétarien
                  </div>
                )}
                {!dish.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold uppercase">Indisponible</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-red-900 flex-1">{dish.name}</h3>
                  {dish.preparationTime && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{dish.preparationTime}min</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
                
                {/* Rating */}
                {dish.reviews && dish.reviews.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.round(
                              dish.reviews!.reduce((sum, r) => sum + r.rating, 0) / dish.reviews!.length
                            )
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({dish.reviews.length})
                    </span>
                  </div>
                )}

                {/* Allergens */}
                {dish.allergens.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-bold text-gray-700">Allergènes:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dish.allergens.map((allergen, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            allergenColors[allergen] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-800">{dish.price}€</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (dish.available) {
                        addToCart(dish);
                        showToast(`${dish.name} ajouté au panier`, "success");
                      }
                    }}
                    disabled={!dish.available}
                    className={`px-6 py-2 font-bold uppercase tracking-wider transition-colors rounded-lg ${
                      dish.available
                        ? "bg-red-800 text-white hover:bg-red-900"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun plat trouvé</p>
          </div>
        )}

        {/* Pagination */}
        {filteredDishes.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-red-800 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-900"
            >
              Précédent
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} sur {Math.ceil(filteredDishes.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(Math.ceil(filteredDishes.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(filteredDishes.length / itemsPerPage)}
              className="px-4 py-2 bg-red-800 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-900"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

