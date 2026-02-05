"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, Tag, X, Check } from "lucide-react";
import { useRestaurant } from "../context/RestaurantContext";
import { useToast } from "../context/ToastContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartSubtotal, getCartDiscount, user, getLoyaltyDiscount, promoCode, applyPromoCode, removePromoCode } = useRestaurant();
  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-8">Panier</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1);
                            if (item.quantity === 1) {
                              showToast(`${item.name} retiré du panier`, "info");
                            }
                          }}
                          className="w-8 h-8 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-red-800 text-white rounded flex items-center justify-center hover:bg-red-900"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-red-800">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            showToast(`${item.name} retiré du panier`, "info");
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100 h-fit">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Résumé</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">{getCartSubtotal().toFixed(2)}€</span>
              </div>
              {getCartDiscount() > 0 && (
                <>
                  <div className="flex justify-between text-green-600">
                    <span className="text-sm">Réductions appliquées</span>
                    <span className="font-medium">-{getCartDiscount().toFixed(2)}€</span>
                  </div>
                  {(() => {
                    const now = new Date();
                    const currentHour = now.getHours();
                    const hasSushi = cart.some(item => item.category === "sushis" || item.category === "makis");
                    const isHappyHour = currentHour >= 14 && currentHour < 17;
                    
                    return (
                      <div className="text-xs text-gray-500 space-y-1">
                        {isHappyHour && hasSushi && (
                          <p>✓ Happy Hour Sushi (-15%)</p>
                        )}
                        {user && !user.isAdmin && getLoyaltyDiscount() > 0 && (
                          <p>✓ Réduction fidélité (-{getLoyaltyDiscount()}%)</p>
                        )}
                        {promoCode && (
                          <p>✓ Code promo: {promoCode}</p>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
              <div className="mt-4 pt-4 border-t border-gray-200">
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
                      className="flex-1 px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900 text-sm"
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
                      className="px-4 py-2 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors text-sm"
                    >
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-900">Total</span>
                  <span className="text-2xl font-bold text-red-800">{getCartTotal().toFixed(2)}€</span>
                </div>
              </div>
            </div>
            <Link
              href="/restaurant/order"
              className="block w-full py-3 bg-red-800 text-white font-bold uppercase tracking-wider text-center rounded-lg hover:bg-red-900 transition-colors"
            >
              Commander
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

