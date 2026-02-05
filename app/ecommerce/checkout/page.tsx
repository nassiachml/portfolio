"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { useRouter } from "next/navigation";
import { CheckCircle, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getCartTotal, createOrder, user } = useStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "France",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-black mb-4">Panier vide</h1>
          <Link
            href="/ecommerce/products"
            className="inline-block px-8 py-4 bg-black text-white font-bold uppercase tracking-wider"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const id = createOrder();
      if (id) {
        setOrderId(id);
        setOrderComplete(true);
      }
      setIsProcessing(false);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-black text-white p-12 text-center"
        >
          <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
            COMMANDE CONFIRMÉE
          </h1>
          <p className="text-gray-300 mb-2">
            Votre commande <span className="font-bold text-white">{orderId}</span> a été enregistrée.
          </p>
          <p className="text-gray-400 mb-8">
            Vous recevrez un email de confirmation sous peu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ecommerce/profile"
              className="px-8 py-4 bg-pink-500 text-white font-bold uppercase tracking-wider hover:bg-pink-600 transition-colors"
            >
              Voir mes commandes
            </Link>
            <Link
              href="/ecommerce/products"
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              Continuer les achats
            </Link>
          </div>
        </motion.div>
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
            FINALISER LA COMMANDE
          </h1>

          <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border border-gray-300 p-8">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                  Informations de livraison
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full mt-4 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full mt-4 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full mt-4 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
                  required
                />
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Code postal"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    value={formData.country}
                    className="px-4 py-3 border-2 border-gray-300 bg-gray-100"
                    readOnly
                  />
                </div>
              </div>

              <div className="border border-gray-300 p-8">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                  Paiement
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-300 hover:border-gray-500 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5"
                    />
                    <CreditCard className="w-5 h-5" />
                    <span className="font-bold">Carte bancaire</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-300 hover:border-gray-500 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="font-bold">PayPal</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full px-6 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Confirmer et payer
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black text-white p-8 sticky top-24">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">Résumé</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="text-sm">
                    <span className="text-gray-200">
                      {item.name} ({item.selectedSize}) x{item.quantity}
                    </span>
                    <span className="float-right font-bold text-white">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-2xl font-black text-white">
                    <span>Total</span>
                    <span>{getCartTotal().toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
