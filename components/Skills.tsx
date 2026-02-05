"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Globe,
  Briefcase,
  Calendar,
  Mail,
} from "lucide-react";

const skillCategories = [
  {
    title: "Langages",
    icon: Code,
    skills: ["HTML5", "CSS3", "PHP", "SQL"],
  },
  {
    title: "Frameworks & CMS",
    icon: Globe,
    skills: [
      "Symfony",
      "React",
      "Vue.js",
      "WordPress (thèmes, plugins, e-commerce)",
    ],
  },
  {
    title: "Bases de données",
    icon: Briefcase,
    skills: ["MySQL"],
  },
  {
    title: "Outils & Technologies",
    icon: Calendar,
    skills: [
      "Git/GitHub",
      "Docker",
      "PhpStorm",
      "VS Code",
      "Linux",
    ],
  },
  {
    title: "Design & UX/UI",
    icon: Mail,
    skills: [
      "Figma",
      "Responsive design",
      "Mobile first",
      "Intégration Stripe/PayPal",
    ],
  },
  {
    title: "Audiovisuel",
    icon: Mail,
    skills: [
      "Caméras Canon et Blackmagic",
      "Son, éclairage, captation, OBS",
      "Premiere Pro",
      "Photoshop",
      "Illustrator",
    ],
  },
  {
    title: "Langues",
    icon: Globe,
    skills: ["Français (courant)", "Anglais (B1)"],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dark-surface"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Compétences</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-bordeaux mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-bordeaux-600 transition-all group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${
                    index % 6 === 0 ? "bg-gradient-bordeaux" :
                    index % 6 === 1 ? "bg-gradient-to-br from-bordeaux-600 to-emerald-600" :
                    index % 6 === 2 ? "bg-gradient-to-br from-bordeaux-600 to-cyan-600" :
                    index % 6 === 3 ? "bg-gradient-to-br from-bordeaux-600 to-blue-600" :
                    index % 6 === 4 ? "bg-gradient-to-br from-bordeaux-600 to-purple-600" :
                    "bg-gradient-to-br from-bordeaux-600 to-pink-600"
                  }`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <h3 className={`text-lg font-bold ${
                    index % 6 === 0 ? "text-bordeaux-400" :
                    index % 6 === 1 ? "text-emerald-400" :
                    index % 6 === 2 ? "text-cyan-400" :
                    index % 6 === 3 ? "text-blue-400" :
                    index % 6 === 4 ? "text-purple-400" :
                    "text-pink-400"
                  }`}>
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: index * 0.1 + skillIndex * 0.05,
                      }}
                      className="text-gray-300 flex items-center gap-2"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        index % 6 === 0 ? "bg-bordeaux-500" :
                        index % 6 === 1 ? "bg-emerald-500" :
                        index % 6 === 2 ? "bg-cyan-500" :
                        index % 6 === 3 ? "bg-blue-500" :
                        index % 6 === 4 ? "bg-purple-500" :
                        "bg-pink-500"
                      }`} />
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

