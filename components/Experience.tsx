"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Stage Développeuse Web",
    company: "Ycom Digitale",
    location: "Troyes",
    period: "AVRIL - JUILLET 2025",
    description: [
      "Conception et développement de deux sites web (WordPress & sur-mesure).",
      "Intégration d'un système d'inscription et de dons en ligne avec paiement (sport & scolaire).",
      "Développement de plugins WordPress personnalisés.",
      "Réalisation front-end : identité visuelle, UX/UI, responsive design.",
      "Gestion de projet complet : de la conception au déploiement.",
    ],
    links: [
      { name: "aschartreux.fr", url: "https://aschartreux.fr" },
      { name: "3c-chartreux.fr", url: "https://3c-chartreux.fr" },
    ],
  },
  {
    title: "Assistante Community Manager",
    company: "Sira Masterclass",
    location: "Troyes",
    period: "JUILLET 2025 - Auj.",
    description: [
      "Création de contenu pour les réseaux sociaux (affiches, visuels, posts) afin de promouvoir Sira Masterclass, une organisation proposant des cours et ateliers éducatifs, ainsi que le Centre Culturel des Chartreux.",
      "Mission réalisée en tant qu'indépendante, permettant de développer ma créativité et de renforcer ma maîtrise des outils de design tout en conciliant activité professionnelle et études.",
    ],
  },
  {
    title: "Développement web",
    company: "Makto Design",
    location: "Troyes",
    period: "SEPTEMBRE 2024",
    description: [
      "Réalisation d'un site vitrine responsive présentant les services et le portfolio d'un graphiste.",
      "Conception et intégration de fonctionnalités spécifiques : formulaires personnalisés (contact et devis), mise en avant du portfolio.",
      "Optimisation de l'expérience utilisateur en respectant un cahier des charges précis.",
      "Mise en place d'une page RGPD et optimisation SEO pour améliorer la visibilité en ligne.",
    ],
    links: [{ name: "maktodesign.com", url: "https://maktodesign.com" }],
  },
  {
    title: "Cheffe & Technicienne Plateau",
    company: "WebTV – IUT de Troyes",
    location: "Troyes",
    period: "2023 - Auj.",
    description: [
      "Responsable du bon fonctionnement du plateau : organisation des espaces, placement des caméras et accessoires techniques, gestion des branchements et vérifications techniques (review).",
      "Gestion des accès et placement des invités pour assurer un déroulement fluide des événements.",
      "Interface principale entre la régie et le plateau, résolution rapide des problèmes techniques.",
      "Captation et encadrement technique de grands événements :",
      "• Remise des diplômes de l'IUT de Troyes – Cadreuse, Cube, Troyes (Décembre 2024)",
      "• Cérémonie de clôture du Festival Premières Marches – Cheffe & Tech plateau, Cinéma CGR, Troyes (Mai 2024)",
      "• Emission & Interview TEDxUTT 2024 – Cheffe & Tech plateau, Université de Technologie de Troyes",
    ],
  },
  {
    title: "Stage d'observation",
    company: "Micronet",
    location: "Troyes",
    period: "MAI - JUIN 2020",
    description: [
      "Apprentissage sur la conception, vente et réparation d'ordinateurs & relation avec le client.",
    ],
  },
  {
    title: "Officielle de compétition d'athlétisme",
    company: "FFA",
    location: "Reims",
    period: "JUIN 2020",
    description: [
      "Assure le respect des règles techniques, chronomètre et mesure les performances des athlètes, et gère les résultats des compétitions.",
      "Diplômée Jeune Juge FFA",
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="experience"
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
            <span className="text-gradient">Expériences Professionnelles</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-bordeaux mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line - Mix bordeaux et orange */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bordeaux-600 via-orange-600 to-bordeaux-800" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot - Alternance bordeaux/orange */}
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-dark-surface z-10 ${
                  index % 2 === 0 ? "bg-bordeaux-600" : "bg-orange-500"
                }`} />

                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8 md:ml-auto"
                  } ml-16 md:ml-0`}
                >
                  <motion.div
                    className="glass rounded-2xl p-4 md:p-6 hover:border-bordeaux-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-bordeaux-400 mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-base md:text-lg font-semibold text-white">
                          {exp.company}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg ${
                        index % 2 === 0 
                          ? "bg-gradient-bordeaux" 
                          : "bg-gradient-to-br from-orange-500 to-orange-600"
                      }`}>
                        <Briefcase size={20} className="text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-bordeaux-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.links && exp.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-dark-border">
                        {exp.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-bordeaux-400 hover:text-bordeaux-300 transition-colors text-sm"
                          >
                            <ExternalLink size={16} />
                            <span>{link.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

