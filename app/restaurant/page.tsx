"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone, Mail, Sparkles, UtensilsCrossed, Star, CheckCircle, Gift, Percent, TrendingUp, Award } from "lucide-react";
import { useRestaurant } from "./context/RestaurantContext";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

interface RestaurantData {
  restaurant: {
    name: string;
    tagline: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    openingHours: any;
    about: string;
  };
  dishes: any[];
  googleReviews?: Review[];
}

export default function RestaurantHome() {
  const { user, loyaltyPoints, loyaltyLevel } = useRestaurant();
  const [data, setData] = useState<RestaurantData | null>(null);
  const [featuredDishes, setFeaturedDishes] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nextOpening, setNextOpening] = useState<string>("");

  const checkIfOpen = (openingHours: any) => {
    const now = new Date();
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentDayIndex = now.getDay();
    const currentDay = dayNames[currentDayIndex];
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM
    
    const hours = openingHours[currentDay];
    
    if (!hours) return { isOpen: false, nextOpening: "" };
    
    const openTime = hours.open;
    const closeTime = hours.close;
    const eveningTime = hours.evening;
    const eveningClose = hours.eveningClose;
    
    // Happy Hour : 14h-17h (restaurant ouvert pour la Happy Hour)
    const happyHourStart = "14:00";
    const happyHourEnd = "17:00";
    
    // Vérifier si on est dans les horaires de déjeuner
    if (currentTime >= openTime && currentTime < closeTime) {
      return { isOpen: true, nextOpening: "" };
    }
    
    // Vérifier si on est dans la Happy Hour (14h-17h)
    if (currentTime >= happyHourStart && currentTime < happyHourEnd) {
      return { isOpen: true, nextOpening: "" };
    }
    
    // Vérifier si on est dans les horaires de dîner
    if (currentTime >= eveningTime && currentTime < eveningClose) {
      return { isOpen: true, nextOpening: "" };
    }
    
    // Si fermé, calculer la prochaine ouverture
    let nextOpen = "";
    if (currentTime < openTime) {
      nextOpen = `Ouverture à ${openTime}`;
    } else if (currentTime >= closeTime && currentTime < happyHourStart) {
      nextOpen = `Happy Hour à ${happyHourStart}`;
    } else if (currentTime >= happyHourEnd && currentTime < eveningTime) {
      nextOpen = `Réouverture à ${eveningTime}`;
    } else {
      // Fermé pour aujourd'hui, ouvrira demain
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDayIndex = tomorrow.getDay();
      const tomorrowDay = dayNames[tomorrowDayIndex];
      const tomorrowHours = openingHours[tomorrowDay];
      if (tomorrowHours) {
        nextOpen = `Ouverture demain à ${tomorrowHours.open}`;
      }
    }
    
    return { isOpen: false, nextOpening: nextOpen };
  };

  useEffect(() => {
    fetch("/restaurant-data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFeaturedDishes(data.dishes.slice(0, 6));
        const status = checkIfOpen(data.restaurant.openingHours);
        setIsOpen(status.isOpen);
        setNextOpening(status.nextOpening);
      });
    
    // Mettre à jour toutes les minutes
    const interval = setInterval(() => {
      if (data) {
        const status = checkIfOpen(data.restaurant.openingHours);
        setIsOpen(status.isOpen);
        setNextOpening(status.nextOpening);
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&h=1080&fit=crop"
            alt="Sushi"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <h1 className="text-7xl md:text-9xl font-bold text-red-900 mb-4 tracking-tight">
              🌸 SAKURA
            </h1>
          </motion.div>
          <p className="text-2xl md:text-3xl text-red-800 mb-4 font-light tracking-wider">
            {data.restaurant.tagline}
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            Une expérience culinaire authentique où tradition et modernité se rencontrent. 
            Découvrez les saveurs du Japon dans un cadre chaleureux et raffiné.
          </p>
          
          {/* Indicateur d'ouverture */}
          {data && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold mb-8 ${
                isOpen
                  ? "bg-green-100 text-green-800 border-2 border-green-600"
                  : "bg-red-100 text-red-800 border-2 border-red-600"
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${isOpen ? "bg-green-600 animate-pulse" : "bg-red-600"}`} />
              <span>
                {isOpen ? "Ouvert maintenant" : nextOpening || "Fermé"}
              </span>
            </motion.div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurant/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-800 text-white font-bold uppercase tracking-wider hover:bg-red-900 transition-colors rounded-lg shadow-lg hover:shadow-xl"
            >
              Découvrir le menu
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/restaurant/reservation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-800 border-2 border-red-800 font-bold uppercase tracking-wider hover:bg-red-50 transition-colors rounded-lg shadow-lg hover:shadow-xl"
            >
              Réserver une table
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12 text-red-800" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-6">
              Bienvenue chez SAKURA
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {data.restaurant.about}
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nous sélectionnons uniquement les meilleurs ingrédients frais pour vous offrir une expérience 
              culinaire authentique. Chaque plat est préparé avec passion et respect des traditions japonaises, 
              créant une harmonie parfaite entre saveurs subtiles et textures raffinées.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offres Spéciales */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-8 h-8 text-red-800" />
              <h2 className="text-4xl md:text-5xl font-bold text-red-900">Offres Spéciales</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profitez de nos promotions exclusives sur les sushis et menus
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
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
            ].map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-red-200 relative"
              >
                <div className="relative h-48">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    -{offer.discount}%
                  </div>
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {offer.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  {offer.price && (
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-red-800">{offer.price}€</span>
                      {offer.originalPrice && (
                        <span className="text-gray-400 line-through">{offer.originalPrice}€</span>
                      )}
                    </div>
                  )}
                  <Link
                    href="/restaurant/menu"
                    className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-red-800 text-white font-bold uppercase tracking-wider hover:bg-red-900 transition-colors rounded-lg"
                  >
                    Commander
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme de Fidélité */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 rounded-2xl shadow-2xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                <h2 className="text-4xl md:text-5xl font-bold">Programme de Fidélité</h2>
              </div>
              <p className="text-xl mb-8 text-white/90 max-w-2xl">
                Gagnez des points à chaque commande et profitez d'avantages exclusifs !
              </p>
              
              {user ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm mb-1">Vos points de fidélité</p>
                      <p className="text-4xl font-bold">{loyaltyPoints || 0} points</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-sm mb-1">Niveau</p>
                      <p className="text-2xl font-bold capitalize">{loyaltyLevel || "Bronze"}</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((loyaltyPoints || 0) % 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-white/70 text-sm">
                    {100 - ((loyaltyPoints || 0) % 100)} points avant le prochain niveau
                  </p>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                  <p className="text-white/80 mb-4">
                    Connectez-vous pour voir vos points de fidélité
                  </p>
                  <Link
                    href="/restaurant/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-800 font-bold uppercase tracking-wider hover:bg-white/90 transition-colors rounded-lg"
                  >
                    Se connecter
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-bold">Gagnez des points</h3>
                  </div>
                  <p className="text-white/80 text-sm">
                    1€ dépensé = 1 point de fidélité. Les points s'accumulent à chaque commande !
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Gift className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-bold">Avantages exclusifs</h3>
                  </div>
                  <p className="text-white/80 text-sm">
                    Réductions progressives : 5% Bronze, 10% Argent, 15% Or, 20% Platine
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-bold">Récompenses</h3>
                  </div>
                  <p className="text-white/80 text-sm">
                    100 points = réduction de 10€. 500 points = menu offert !
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <UtensilsCrossed className="w-10 h-10 text-red-800" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
              Nos Spécialités
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Découvrez une sélection de nos plats les plus appréciés, préparés avec soin par notre chef
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-amber-200 cursor-pointer"
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
                  {dish.spicy && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase rounded">
                      🌶️ Épicé
                    </div>
                  )}
                  {dish.vegetarian && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 text-xs font-bold uppercase rounded">
                      🌱 Végétarien
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-2">{dish.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-800">{dish.price}€</span>
                    <Link
                      href={`/restaurant/menu/${dish.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 bg-red-800 text-white font-medium hover:bg-red-900 transition-colors rounded"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/restaurant/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-800 text-white font-bold uppercase tracking-wider hover:bg-red-900 transition-colors rounded-lg shadow-lg"
            >
              Voir tout le menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      {data.googleReviews && data.googleReviews.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-3xl font-bold text-gray-900">4.9</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
                Avis Google
              </h2>
              <p className="text-gray-700 text-lg">
                Découvrez ce que nos clients pensent de SAKURA
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.googleReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{review.name}</h3>
                        {review.verified && (
                          <span title="Avis vérifié">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
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
                        <span className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center border border-amber-200"
            >
              <Clock className="w-12 h-12 mx-auto mb-4 text-red-800" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Horaires</h3>
              <p className="text-gray-700">
                <span className="font-medium">Déjeuner :</span> 12h - 14h30
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Dîner :</span> 19h - 22h30
              </p>
              <p className="text-sm text-gray-500 mt-2">Ouvert 7j/7</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center border border-amber-200"
            >
              <MapPin className="w-12 h-12 mx-auto mb-4 text-red-800" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Adresse</h3>
              <p className="text-gray-700">{data.restaurant.address}</p>
              <p className="text-sm text-gray-500 mt-2">Au cœur de Troyes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center border border-amber-200"
            >
              <Phone className="w-12 h-12 mx-auto mb-4 text-red-800" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Contact</h3>
              <p className="text-gray-700">
                <a href={`tel:${data.restaurant.phone}`} className="hover:text-red-800">
                  {data.restaurant.phone}
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <a href={`mailto:${data.restaurant.email}`} className="hover:text-red-800">
                  {data.restaurant.email}
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
