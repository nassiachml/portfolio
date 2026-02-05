"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFitness } from "../context/FitnessContext";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, Euro, Clock, ShoppingCart } from "lucide-react";

const DURATION_OPTIONS = [
  { value: 30, label: "30 min" },
  { value: 60, label: "1 h" },
  { value: 90, label: "1 h 30" },
];

export default function CoachesPage() {
  const { user, coaches, getBookingsForUser, addToCoachCart } = useFitness();
  const router = useRouter();
  const [bookings, setBookings] = useState(getBookingsForUser(user?.id ?? ""));
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!user) router.replace("/fitness/login");
  }, [user, router]);

  useEffect(() => {
    if (user) setBookings(getBookingsForUser(user.id));
  }, [user, getBookingsForUser]);

  const handleAddToCart = () => {
    if (!selectedCoach || !selectedSlot) return;
    const ok = addToCoachCart(selectedCoach, selectedSlot, selectedDuration);
    if (ok) {
      setAddedFeedback(selectedCoach);
      setTimeout(() => {
        setAddedFeedback(null);
        setSelectedCoach(null);
        setSelectedSlot(null);
      }, 1500);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-wellness-brown mb-1">Réserver un coach</h1>
          <p className="text-slate-500">Choisissez un coach, un créneau et la durée, puis ajoutez au panier.</p>
        </div>
        <Link
          href="/fitness/cart"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-wellness-brown/90 transition-colors shadow-lg shadow-orange-500/25"
        >
          <ShoppingCart className="w-5 h-5" />
          Voir le panier
        </Link>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {coaches.map((c, i) => {
          const priceForDuration = Math.round((c.price * selectedDuration) / 60);
          const isSelected = selectedCoach === c.id && selectedSlot;
          const justAdded = addedFeedback === c.id;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-wellness-off-white rounded-2xl border border-wellness-sage/20 p-6 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-wellness-sage to-wellness-brown flex items-center justify-center text-white shadow-md"
                  >
                    <Users className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-wellness-brown">{c.name}</p>
                    <p className="text-sm text-orange-600 font-medium">{c.specialty}</p>
                  </div>
                </div>
                <p className="flex items-center gap-1 text-wellness-brown/70 font-medium">
                  <Euro className="w-4 h-4" />
                  {c.price}/h
                </p>
              </div>

              <p className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Choisir la durée
              </p>
              <div className="flex gap-2 mb-4">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDuration(d.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDuration === d.value
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-slate-100 text-wellness-brown/70 hover:bg-wellness-sage/10 hover:text-wellness-sage-muted"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <p className="text-sm text-slate-500 mb-3">Créneaux disponibles :</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {c.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedCoach(c.id);
                      setSelectedSlot(slot);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCoach === c.id && selectedSlot === slot
                        ? "bg-orange-600 text-white ring-2 ring-wellness-sage/40"
                        : "bg-slate-100 text-wellness-brown/70 hover:bg-wellness-sage/10 hover:text-wellness-sage-muted"
                    }`}
                  >
                    {new Date(slot).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                  </button>
                ))}
              </div>

              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <p className="text-sm text-wellness-brown/70">
                    <span className="font-semibold">{selectedDuration} min</span> → <span className="text-orange-600 font-bold">{priceForDuration} €</span>
                  </p>
                  <button
                    onClick={handleAddToCart}
                    disabled={!!addedFeedback}
                    className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-wellness-brown/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {justAdded ? (
                      <>
                        <span className="text-lg">✓</span> Ajouté au panier
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Ajouter au panier
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {bookings.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-wellness-brown mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            Mes réservations
          </h2>
          <div className="space-y-3">
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-wellness-brown">{b.coachName}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(b.slot).toLocaleString("fr-FR")}
                    {b.durationMinutes != null && ` • ${b.durationMinutes} min`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600 font-semibold">{b.amount} €</span>
                  {b.paid ? (
                    <span className="text-xs bg-orange-100 text-wellness-sage-muted px-2 py-1 rounded-full font-medium">Payé</span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-wellness-brown/80 px-2 py-1 rounded-full font-medium">En attente</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
