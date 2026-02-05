"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, CheckCircle } from "lucide-react";
import { useRestaurant } from "../context/RestaurantContext";
import { useToast } from "../context/ToastContext";
import { useRouter } from "next/navigation";

export default function ReservationPage() {
  const { addReservation, user } = useRestaurant();
  const { showToast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 2,
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.date) {
      newErrors.date = "La date est requise";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "La date ne peut pas être dans le passé";
      }
    }
    
    if (!formData.time) {
      newErrors.time = "L'heure est requise";
    }
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }
    
    if (!formData.phone || !/^[0-9+\s-]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide";
    }
    
    if (formData.guests < 1 || formData.guests > 12) {
      newErrors.guests = "Le nombre de personnes doit être entre 1 et 12";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Veuillez corriger les erreurs dans le formulaire", "error");
      return;
    }
    
    addReservation({
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialRequests: formData.specialRequests || undefined,
    });
    showToast("Réservation envoyée ! Vous recevrez une confirmation par email.", "success");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      router.push("/restaurant");
    }, 2000);
  };

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-4">
            Réservation
          </h1>
          <p className="text-gray-600 text-lg">
            Réservez votre table et vivez une expérience culinaire inoubliable
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
              Réservation confirmée !
            </h2>
            <p className="text-green-700">
              Nous avons bien reçu votre demande. Vous recevrez une confirmation par email.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-xl p-8 border-2 border-red-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-red-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    max={maxDate}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: "" });
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 ${
                      errors.date
                        ? "border-red-500 focus:border-red-600"
                        : "border-red-200 focus:border-red-800"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Heure
                  </label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => {
                      setFormData({ ...formData, time: e.target.value });
                      if (errors.time) setErrors({ ...errors, time: "" });
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 ${
                      errors.time
                        ? "border-red-500 focus:border-red-600"
                        : "border-red-200 focus:border-red-800"
                    }`}
                  >
                    <option value="">Sélectionner une heure</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-red-900 dark:text-red-300 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Nombre de personnes
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="12"
                  value={formData.guests}
                  onChange={(e) => {
                    setFormData({ ...formData, guests: parseInt(e.target.value) || 1 });
                    if (errors.guests) setErrors({ ...errors, guests: "" });
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 ${
                    errors.guests
                      ? "border-red-500 focus:border-red-600"
                      : "border-red-200 focus:border-red-800"
                  }`}
                />
                {errors.guests && (
                  <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-red-900 dark:text-red-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 ${
                    errors.name
                      ? "border-red-500 focus:border-red-600"
                      : "border-red-200 focus:border-red-800"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-red-900 dark:text-red-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 ${
                    errors.email
                      ? "border-red-500 focus:border-red-600"
                      : "border-red-200 focus:border-red-800"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-red-900 dark:text-red-300 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: "" });
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 ${
                    errors.phone
                      ? "border-red-500 focus:border-red-600"
                      : "border-red-200 focus:border-red-800"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-red-900 dark:text-red-300 mb-2">
                  Demandes spéciales (optionnel)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
                  placeholder="Allergies, préférences alimentaires, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
              >
                Confirmer la réservation
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

