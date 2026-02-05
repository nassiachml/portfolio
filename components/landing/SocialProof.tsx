"use client";

import { motion } from "framer-motion";
import { Star, Users, TrendingUp, Heart } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Martin",
    role: "Designer freelance",
    content: "Flowly a changé ma façon de travailler. Je gagne au moins 2 heures par jour et je ne stresse plus sur mes deadlines.",
    rating: 5,
  },
  {
    name: "Thomas Dubois",
    role: "Développeur indépendant",
    content: "L'interface est intuitive et les rappels automatiques sont un vrai game-changer. Je recommande à 100%.",
    rating: 5,
  },
  {
    name: "Emma Laurent",
    role: "Créatrice de contenu",
    content: "Enfin un outil qui comprend les besoins des freelances. La vue calendrier est parfaite pour gérer mes multiples projets.",
    rating: 5,
  },
];

const stats = [
  { icon: Users, value: "+2 500", label: "Utilisateurs actifs" },
  { icon: Star, value: "98%", label: "De satisfaction" },
  { icon: TrendingUp, value: "4.9/5", label: "Note moyenne" },
  { icon: Heart, value: "92%", label: "Recommandent Flowly" },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
              >
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600">
            Rejoignez des milliers de freelances qui font confiance à Flowly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos clients (fictifs) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-gray-200"
        >
          <p className="text-center text-sm text-gray-500 mb-8 font-medium">
            Utilisé par des créateurs et freelances du monde entier
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["Studio Creative", "Freelance Hub", "Design Co", "Tech Start", "Content Pro"].map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-bold text-gray-400"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
