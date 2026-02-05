"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRestaurant } from "../context/RestaurantContext";
import { Star, Gift, TrendingUp, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, isAdmin, getOrders, getReservations, loyaltyPoints, loyaltyLevel, getLoyaltyDiscount } = useRestaurant();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/restaurant/login");
      return;
    }
    // Utiliser un timeout pour s'assurer que les commandes sont chargées
    const timer = setTimeout(() => {
      const allOrders = getOrders();
      const filteredOrders = allOrders.filter((o) => {
        const matchesName = o.customerName === user.name;
        const matchesPhone = o.customerPhone === user.phone;
        return matchesName || matchesPhone;
      });
      setOrders(filteredOrders);
      
      // Charger les réservations
      const allReservations = getReservations();
      const filteredReservations = allReservations.filter((r) => {
        const matchesName = r.name === user.name;
        const matchesPhone = r.phone === user.phone;
        const matchesEmail = r.email === user.email;
        return matchesName || matchesPhone || matchesEmail;
      });
      setReservations(filteredReservations);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [user, router, getOrders, getReservations]);

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-500";
      case "ready":
        return "bg-green-100 text-green-800 border-green-500";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-500";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "preparing":
        return "En préparation";
      case "ready":
        return "Prête";
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-8">Mon Compte</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
              <h2 className="text-2xl font-bold text-red-900 mb-4">Informations</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nom</p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                )}
              </div>
            </div>

            {!isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 rounded-lg shadow-lg p-6 border-2 border-red-200 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <h2 className="text-2xl font-bold">Programme de Fidélité</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Vos points</p>
                    <p className="text-3xl font-bold">{loyaltyPoints || 0} points</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">Niveau actuel</p>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <p className="text-xl font-bold capitalize">{loyaltyLevel || "Bronze"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">Réduction active</p>
                    <p className="text-2xl font-bold text-yellow-400">{getLoyaltyDiscount()}%</p>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((loyaltyPoints || 0) % 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    {100 - ((loyaltyPoints || 0) % 100)} points avant le prochain niveau
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
              <h2 className="text-2xl font-bold text-red-900 mb-4">Historique des Commandes</h2>
              {orders.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {orders.map((order) => {
                    const orderPoints = Math.floor(order.total);
                    return (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-bold text-gray-900">{order.id}</p>
                              <span
                                className={`px-2 py-1 rounded border text-xs font-bold uppercase ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {getStatusLabel(order.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {new Date(order.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                            <div className="space-y-1 mb-2">
                              <p className="text-sm text-gray-700">
                                {order.items.length} article(s) - {order.type === "pickup" ? "À emporter" : "Sur place"}
                              </p>
                              {!isAdmin && (
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-600">Points gagnés :</span>
                                  <span className="font-bold text-red-800 flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    +{orderPoints} points
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-800 text-lg">{order.total.toFixed(2)}€</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">Aucune commande</p>
              )}
            </div>

            {!isAdmin && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
                <h2 className="text-2xl font-bold text-red-900 mb-4">Mes Réservations</h2>
                {reservations.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {reservations.map((reservation) => (
                      <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-bold text-gray-900">{reservation.id}</p>
                              <span
                                className={`px-2 py-1 rounded border text-xs font-bold uppercase ${
                                  reservation.status === "confirmed"
                                    ? "bg-green-100 text-green-800 border-green-500"
                                    : reservation.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-500"
                                    : "bg-red-100 text-red-800 border-red-500"
                                }`}
                              >
                                {reservation.status === "confirmed"
                                  ? "Confirmée"
                                  : reservation.status === "pending"
                                  ? "En attente"
                                  : "Annulée"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {new Date(reservation.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              })} à {reservation.time}
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-700">
                                {reservation.guests} personne(s)
                              </p>
                              {reservation.specialRequests && (
                                <p className="text-xs text-gray-500 italic">
                                  "{reservation.specialRequests}"
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aucune réservation</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

