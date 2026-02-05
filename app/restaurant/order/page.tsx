"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShoppingCart, CheckCircle, Tag, X, Check } from "lucide-react";
import { useRestaurant } from "../context/RestaurantContext";
import { useToast } from "../context/ToastContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderPage() {
  const { cart, getCartTotal, getCartSubtotal, getCartDiscount, addOrder, clearCart, user, getLoyaltyDiscount, promoCode, applyPromoCode, removePromoCode } = useRestaurant();
  const { showToast } = useToast();
  const router = useRouter();
  const [orderType, setOrderType] = useState<"pickup" | "dine-in">("pickup");
  const [pickupTime, setPickupTime] = useState("");
  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [submitted, setSubmitted] = useState(false);
  const [promoInput, setPromoInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Votre panier est vide", "warning");
      return;
    }

    const newOrder = addOrder({
      items: cart,
      total: getCartTotal(),
      type: orderType,
      pickupTime: orderType === "pickup" ? pickupTime : undefined,
      customerName,
      customerPhone,
    });

    clearCart();
    showToast(`Commande ${newOrder.id} confirmée !`, "success");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (user) {
        router.push("/restaurant/profile");
      } else {
        router.push("/restaurant/menu");
      }
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-900 mb-4">Votre panier est vide</h1>
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

  const timeSlots = [];
  const now = new Date();
  for (let i = 1; i <= 6; i++) {
    const time = new Date(now.getTime() + i * 30 * 60 * 1000);
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    timeSlots.push(`${hours}:${minutes}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-4">
            Commander
          </h1>
          <p className="text-gray-600 text-lg">
            Commandez en avance pour manger sur place ou à emporter
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Commande confirmée !
            </h2>
            <p className="text-green-700">
              Votre commande a été enregistrée. Vous pouvez suivre son statut dans votre espace client.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
              <h2 className="text-2xl font-bold text-red-900 mb-4">Récapitulatif</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                    </div>
                    <p className="font-bold text-red-800">{(item.price * item.quantity).toFixed(2)}€</p>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-red-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">{getCartSubtotal().toFixed(2)}€</span>
                </div>
                {getCartDiscount() > 0 && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Réductions</span>
                      <span className="font-medium">-{getCartDiscount().toFixed(2)}€</span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      {(() => {
                        const now = new Date();
                        const currentHour = now.getHours();
                        const hasSushi = cart.some(item => item.category === "sushis" || item.category === "makis");
                        const isHappyHour = currentHour >= 14 && currentHour < 17;
                        
                        return (
                          <>
                            {isHappyHour && hasSushi && (
                              <p>✓ Happy Hour Sushi (-15%)</p>
                            )}
                            {user && !user.isAdmin && getLoyaltyDiscount() > 0 && (
                              <p>✓ Réduction fidélité (-{getLoyaltyDiscount()}%)</p>
                            )}
                            {promoCode && (
                              <p>✓ Code promo: {promoCode}</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-xl font-bold text-red-900">Total</span>
                  <span className="text-2xl font-bold text-red-800">{getCartTotal().toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-red-900 mb-2">
                    Type de commande
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setOrderType("pickup")}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                        orderType === "pickup"
                          ? "bg-red-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      À emporter
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("dine-in")}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                        orderType === "dine-in"
                          ? "bg-red-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Sur place
                    </button>
                  </div>
                </div>

                {orderType === "pickup" && (
                  <div>
                    <label className="block text-sm font-bold text-red-900 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Heure de retrait
                    </label>
                    <select
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
                    >
                      <option value="">Sélectionner une heure</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-red-900 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-900 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
                  />
                </div>

                {!user && (
                  <div>
                    <label className="block text-sm font-bold text-red-900 mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
                      placeholder="votre@email.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Créez un compte pour gagner des points de fidélité
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-red-900 mb-2">
                    Code promo
                  </label>
                  {promoCode ? (
                    <div className="flex items-center justify-between bg-green-50 border-2 border-green-500 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{promoCode}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removePromoCode();
                          showToast("Code promo retiré", "info");
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="Entrez un code promo"
                        className="flex-1 px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (applyPromoCode(promoInput)) {
                            showToast(`Code promo ${promoInput} appliqué !`, "success");
                            setPromoInput("");
                          } else {
                            showToast("Code promo invalide", "error");
                          }
                        }}
                        className="px-4 py-3 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
                      >
                        <Tag className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
                >
                  Confirmer la commande
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

