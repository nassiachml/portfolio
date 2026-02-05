"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFitness } from "../context/FitnessContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, CreditCard, Clock, Euro } from "lucide-react";

export default function CoachCartPage() {
  const { user, coachCart, removeFromCoachCart, clearCoachCart, checkoutCoachCart, getCoachCartTotal, confirmPayment } = useFitness();
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) router.replace("/fitness/login");
  }, [user, router]);

  const total = getCoachCartTotal();

  const handleCheckout = () => {
    if (coachCart.length === 0) return;
    const ids = checkoutCoachCart();
    setPendingIds(ids);
    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    pendingIds.forEach((id) => confirmPayment(id));
    setPendingIds([]);
    setShowPayment(false);
    router.push("/fitness/coaches");
  };

  if (!user) return null;

  if (coachCart.length === 0 && !showPayment) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-wellness-sage/20 p-12 shadow-sm"
        >
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-wellness-brown/50" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Panier vide</h2>
          <p className="text-wellness-brown/60 mb-6">Ajoutez des séances avec un coach depuis la page Coachs.</p>
          <Link
            href="/fitness/coaches"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-wellness-brown/90 transition-colors"
          >
            Voir les coachs
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <ShoppingCart className="w-7 h-7 text-orange-600" />
          Panier coachs
        </h1>
        <p className="text-wellness-brown/60 mb-8">{coachCart.length} séance(s) sélectionnée(s)</p>

        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {coachCart.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{item.coachName}</p>
                  <p className="text-sm text-orange-600">{item.specialty}</p>
                  <p className="text-sm text-wellness-brown/60 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    {new Date(item.slot).toLocaleString("fr-FR")} • {item.durationMinutes} min
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">{item.totalPrice} €</span>
                  <button
                    onClick={() => removeFromCoachCart(item.id)}
                    className="p-2 text-wellness-brown/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Retirer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-wellness-sage/20 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-600 font-medium">Total</span>
            <span className="text-2xl font-bold text-orange-600 flex items-center gap-1">
              <Euro className="w-6 h-6" />
              {total} €
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => clearCoachCart()}
              className="px-4 py-2 bg-slate-100 text-wellness-brown/80 rounded-xl font-medium hover:bg-wellness-sage/15 transition-colors"
            >
              Vider le panier
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-wellness-brown/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-wellness-brown/20/25"
            >
              <CreditCard className="w-5 h-5" />
              Passer au paiement
            </button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                Paiement simulé (sandbox)
              </h3>
              <p className="text-slate-600 mb-4">
                Ceci est une démonstration. En production, Stripe ou PayPal gérerait le paiement.
              </p>
              <p className="text-wellness-brown/80 font-semibold mb-4">Total : {total} €</p>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-wellness-brown/90 transition-colors"
                >
                  Confirmer le paiement
                </button>
                <button
                  onClick={() => {
                    setShowPayment(false);
                    setPendingIds([]);
                  }}
                  className="px-4 py-3 bg-slate-100 text-wellness-brown/80 rounded-xl font-medium hover:bg-wellness-sage/15 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
