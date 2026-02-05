"use client";

import { motion } from "framer-motion";
import { Clock, Target, Zap } from "lucide-react";

const valueProps = [
  {
    icon: Clock,
    title: "Gagnez du temps chaque jour",
    description: "Automatisez vos tâches répétitives et concentrez-vous sur votre travail créatif.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Target,
    title: "Une vue claire sur vos priorités",
    description: "Visualisez l'essentiel en un coup d'œil et prenez les bonnes décisions rapidement.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Travaillez plus sereinement",
    description: "Réduisez le stress et retrouvez votre équilibre avec une organisation qui vous suit.",
    color: "from-pink-500 to-pink-600",
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Pourquoi choisir <span className="text-blue-600">Flowly</span> ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des bénéfices concrets pour votre quotidien de freelance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${prop.color} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{prop.title}</h3>
                <p className="text-gray-600 leading-relaxed">{prop.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
