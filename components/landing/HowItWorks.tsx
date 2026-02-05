"use client";

import { motion } from "framer-motion";
import { UserPlus, FolderPlus, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Créez un compte",
    description: "Inscription en 30 secondes, aucune carte bancaire requise. Commencez votre essai gratuit immédiatement.",
    number: "01",
  },
  {
    icon: FolderPlus,
    title: "Ajoutez vos projets",
    description: "Importez vos tâches existantes ou créez vos premiers projets. L'interface s'adapte à votre workflow.",
    number: "02",
  },
  {
    icon: Rocket,
    title: "Travaillez plus efficacement",
    description: "Profitez de rappels intelligents, de vues personnalisables et d'une organisation qui vous fait gagner du temps.",
    number: "03",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En 3 étapes simples, reprenez le contrôle de votre organisation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Icon className="text-white" size={36} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-4 z-10">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
