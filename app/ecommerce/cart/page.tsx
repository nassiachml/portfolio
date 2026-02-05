"use client";

import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    createOrder,
    user,
  } = useStore();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push("/ecommerce/login?redirect=checkout");
      return;
    }
    router.push("/ecommerce/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tighter">
            PANIER VIDE
          </h1>
          <p className="text-gray-600 mb-8 uppercase tracking-wider">
            Ajoutez des articles à votre panier
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
          </div>
        </motion.div>
      </section>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-12 tracking-tighter">
            PANIER
          </h1>

          <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 p-6 flex flex-col md:flex-row gap-6 hover:border-gray-400 transition-colors"
              >
                <div className="w-full md:w-32 h-40 md:h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2 uppercase tracking-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="uppercase">Taille: {item.selectedSize}</span>
                    <span className="uppercase">Couleur: {item.selectedColor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-black w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">
                        {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.selectedSize, item.selectedColor)
                  }
                  className="text-gray-400 hover:text-red-500 transition-colors self-start md:self-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
              <div className="bg-black text-white p-8 sticky top-24">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                RÉSUMÉ
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-200">
                  <span>Sous-total</span>
                  <span className="font-bold text-white">
                    {getCartTotal().toFixed(2)}€
                  </span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span>Livraison</span>
                  <span className="font-bold text-white">Gratuite</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-2xl font-black text-white">
                    <span>Total</span>
                    <span>{getCartTotal().toFixed(2)}€</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-4 bg-pink-500 text-white font-bold uppercase tracking-wider hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
              >
                Commander
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="/ecommerce/products"
                className="block text-center mt-4 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
              >
                Continuer les achats
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
