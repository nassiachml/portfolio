"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, AlertTriangle, Leaf, Flame, ArrowLeft, Plus, Minus, Clock, Star } from "lucide-react";
import { useRestaurant } from "../../context/RestaurantContext";
import { useToast } from "../../context/ToastContext";
import Link from "next/link";

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

export default function DishDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, toggleFavorite, isFavorite, updateQuantity, cart } = useRestaurant();
  const { showToast } = useToast();
  const [dish, setDish] = useState<Dish | null>(null);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/restaurant-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setAllDishes(data.dishes || []);
        const found = data.dishes.find(
          (d: Dish) => d.id === Number(params.id)
        );
        if (found) {
          setDish(found);
        } else {
          setError("Plat introuvable");
        }
      })
      .catch((err) => {
        setError("Impossible de charger le plat. Veuillez réessayer.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  // Suggestions de plats similaires
  const getSuggestedDishes = () => {
    if (!dish || allDishes.length === 0) return [];
    
    // Trouver des plats de la même catégorie, excluant le plat actuel
    const sameCategory = allDishes.filter(
      (d) => d.category === dish.category && d.id !== dish.id && d.available
    );
    
    // Si pas assez, ajouter des plats populaires (avec de bonnes notes)
    const popular = allDishes
      .filter((d) => d.id !== dish.id && d.available && d.reviews && d.reviews.length > 0)
      .sort((a, b) => {
        const avgA = a.reviews!.reduce((sum, r) => sum + r.rating, 0) / a.reviews!.length;
        const avgB = b.reviews!.reduce((sum, r) => sum + r.rating, 0) / b.reviews!.length;
        return avgB - avgA;
      });
    
    // Combiner et limiter à 3
    const suggestions = [...sameCategory, ...popular]
      .filter((d, index, self) => self.findIndex((x) => x.id === d.id) === index)
      .slice(0, 3);
    
    return suggestions;
  };

  const suggestedDishes = getSuggestedDishes();

  const handleAddToCart = () => {
    if (!dish) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(dish);
    }
    setQuantity(1);
  };

  const cartItem = dish ? cart.find((item) => item.id === dish.id) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Plat introuvable"}</p>
          <Link
            href="/restaurant/menu"
            className="px-6 py-3 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors inline-block"
          >
            Retour au menu
          </Link>
        </div>
      </div>
    );
  }

  const allergenColors: { [key: string]: string } = {
    Poisson: "bg-blue-100 text-blue-800",
    Soja: "bg-green-100 text-green-800",
    Gluten: "bg-yellow-100 text-yellow-800",
    "Œufs": "bg-orange-100 text-orange-800",
    Sésame: "bg-purple-100 text-purple-800",
    Lait: "bg-pink-100 text-pink-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/restaurant/menu"
          className="flex items-center gap-2 text-red-800 hover:text-red-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour au menu</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <button
                onClick={() => toggleFavorite(dish.id)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite(dish.id)
                      ? "fill-red-600 text-red-600"
                      : "text-gray-600"
                  }`}
                />
              </button>
              {dish.spicy && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase rounded">
                  🌶️ Épicé
                </div>
              )}
              {dish.vegetarian && (
                <div className="absolute bottom-4 left-4 bg-green-600 text-white px-4 py-2 text-sm font-bold uppercase rounded">
                  🌱 Végétarien
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">{dish.name}</h1>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">{dish.description}</p>

            {/* Allergens */}
            {dish.allergens.length > 0 && (
              <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-orange-900">Allergènes présents :</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dish.allergens.map((allergen, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm font-medium rounded ${
                        allergenColors[allergen] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation Time */}
            {dish.preparationTime && (
              <div className="mb-6 flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-red-800" />
                <span className="font-medium">Temps de préparation : {dish.preparationTime} minutes</span>
              </div>
            )}

            {/* Price and Quantity */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-4xl font-bold text-red-800">{dish.price}€</span>
                  {dish.reviews && dish.reviews.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => {
                          const reviews = dish.reviews ?? [];
                          const avg = reviews.length > 0
                            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                            : 0;
                          return (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(avg)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({(dish.reviews ?? []).length} avis)
                      </span>
                    </div>
                  )}
                </div>
                {cartItem && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(dish.id, cartItem.quantity - 1)}
                      className="w-10 h-10 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-gray-900 w-8 text-center">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(dish.id, cartItem.quantity + 1)}
                      className="w-10 h-10 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {!cartItem && (
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-gray-700">Quantité :</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-gray-900 w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={!dish.available}
                className={`w-full py-4 font-bold uppercase tracking-wider rounded-lg transition-colors ${
                  dish.available
                    ? "bg-red-800 text-white hover:bg-red-900"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {cartItem ? "Déjà dans le panier" : "Ajouter au panier"}
              </button>
            </div>

            {/* Info */}
            <div className="space-y-3 text-sm text-gray-600">
              {dish.vegetarian && (
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span>Plat végétarien</span>
                </div>
              )}
              {dish.spicy && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>Plat épicé</span>
                </div>
              )}
              {!dish.available && (
                <div className="text-red-600 font-medium">
                  Ce plat est actuellement indisponible
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {dish.reviews && dish.reviews.length > 0 && (
          <div className="mt-16 border-t-2 border-amber-200 pt-12">
            <h2 className="text-3xl font-bold text-red-900 mb-8 flex items-center gap-2">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              Avis clients ({dish.reviews.length})
            </h2>
            <div className="space-y-6">
              {dish.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{review.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions de plats similaires */}
        {suggestedDishes.length > 0 && (
          <div className="mt-16 border-t-2 border-amber-200 pt-12">
            <h2 className="text-3xl font-bold text-red-900 mb-8 flex items-center gap-2">
              <span>Vous pourriez aussi aimer</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {suggestedDishes.map((suggested) => (
                <motion.div
                  key={suggested.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-red-100 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => router.push(`/restaurant/menu/${suggested.id}`)}
                >
                  <div className="relative h-48">
                    <Image
                      src={suggested.image}
                      alt={suggested.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {suggested.spicy && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase rounded">
                        🌶️
                      </div>
                    )}
                    {suggested.vegetarian && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs font-bold uppercase rounded">
                        🌱
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-red-900 mb-1">{suggested.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{suggested.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-800">{suggested.price}€</span>
                      {suggested.reviews && suggested.reviews.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {(
                              suggested.reviews.reduce((sum, r) => sum + r.rating, 0) /
                              suggested.reviews.length
                            ).toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

