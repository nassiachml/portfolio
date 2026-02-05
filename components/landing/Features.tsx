"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Bell, FolderKanban } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "Gestion des tâches intelligente",
    description: "Créez, organisez et suivez vos tâches avec un système de priorités adaptatif qui s'ajuste à vos besoins.",
    benefit: "Ne perdez plus jamais une deadline importante",
    color: "blue",
  },
  {
    icon: Calendar,
    title: "Vue calendrier",
    description: "Visualisez tous vos projets et échéances dans un calendrier intuitif et synchronisé en temps réel.",
    benefit: "Planifiez votre semaine en toute sérénité",
    color: "purple",
  },
  {
    icon: Bell,
    title: "Rappels automatiques",
    description: "Recevez des notifications intelligentes pour ne jamais oublier une tâche importante ou une échéance.",
    benefit: "Restez toujours à jour sans effort",
    color: "pink",
  },
  {
    icon: FolderKanban,
    title: "Organisation par projet",
    description: "Groupez vos tâches par projet avec des vues personnalisables et des tableaux Kanban intuitifs.",
    benefit: "Gérez plusieurs projets simultanément",
    color: "indigo",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des fonctionnalités pensées pour les freelances et créateurs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600",
              purple: "from-purple-500 to-purple-600",
              pink: "from-pink-500 to-pink-600",
              indigo: "from-indigo-500 to-indigo-600",
            };
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="font-medium">{feature.benefit}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
