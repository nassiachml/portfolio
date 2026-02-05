"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, Target, Heart } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const interests = [
    "Lecture & Écriture",
    "Photographie & Peinture",
    "Randonnées & Aquasport",
    "Voyage",
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">À Propos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-bordeaux mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-bordeaux-600 to-purple-600 rounded-lg">
                <User className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Profil</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Sérieuse et dynamique, actuellement en 3ème année en{" "}
              <span className="text-bordeaux-400 font-semibold">
                BUT Métiers du Multimédia et de l'Internet
              </span>{" "}
              à Troyes, je suis activement à la recherche d'un stage de 14
              semaines en tant que développeuse web Full Stack (front & back
              end).
            </p>
            <p className="text-gray-300 leading-relaxed">
              N'hésitez pas à me contacter et à jeter un œil à mon Portfolio !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-bordeaux-600 to-violet-600 rounded-lg">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Objectif</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              À la recherche d'un stage de 14 semaines en{" "}
              <span className="text-bordeaux-400 font-semibold">
                développement web et dispositifs interactifs
              </span>{" "}
              à partir de mars 2026.
            </p>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-bordeaux-600 to-pink-600 rounded-lg">
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Centres d'intérêts</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <motion.span
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="px-3 py-1 bg-bordeaux-900/30 border border-bordeaux-800 rounded-full text-sm text-bordeaux-300"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

