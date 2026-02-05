"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Award } from "lucide-react";

const educations = [
  {
    degree: "BUT Métiers du Multimédia et de l'Internet",
    school: "IUT de Troyes",
    period: "2023 - Auj.",
    description: "Développement web et dispositifs interactifs",
    icon: GraduationCap,
  },
  {
    degree: "Licence de Langues, littératures et civilisations étrangères et régionales",
    school: "Comtes de Champagne",
    period: "2022 - 2023",
    description: "Parcours Anglais",
    icon: GraduationCap,
  },
  {
    degree: "Baccalauréat général",
    school: "Lycée Chrestien de Troyes",
    period: "2021 - 2022",
    description: "Mention Assez bien, Mathématiques, Physique-Chimie, option Maths Expertes",
    icon: Award,
  },
];

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="education"
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
            <span className="text-gradient">Formation</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-bordeaux mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {educations.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass rounded-2xl p-8 hover:border-bordeaux-600 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className={`p-4 rounded-xl group-hover:scale-110 transition-transform ${
                    index === 0 
                      ? "bg-gradient-to-br from-bordeaux-600 to-cyan-600"
                      : index === 1
                      ? "bg-gradient-to-br from-bordeaux-600 to-blue-600"
                      : "bg-gradient-bordeaux"
                  }`}>
                    <Icon className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-bordeaux-400">
                  {edu.degree}
                </h3>
                <p className="text-lg font-semibold text-white mb-2 text-center">
                  {edu.school}
                </p>
                <p className="text-sm text-gray-400 mb-4 text-center">
                  {edu.period}
                </p>
                <p className="text-gray-300 text-center text-sm">
                  {edu.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

