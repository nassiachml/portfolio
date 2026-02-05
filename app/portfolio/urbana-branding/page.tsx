"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Palette, Type, Image as ImageIcon, Layers, Sparkles, Target } from "lucide-react";
import ColorSwatch from "@/components/branding/ColorSwatch";
import TypographyPreview from "@/components/branding/TypographyPreview";
import MockupGallery from "@/components/branding/MockupGallery";

const colors = [
  {
    name: "Noir Urbain",
    hex: "#0A0A0A",
    usage: "Texte principal, éléments structurants",
  },
  {
    name: "Blanc Pur",
    hex: "#FFFFFF",
    usage: "Fonds, espaces négatifs, contraste",
  },
  {
    name: "Orange Énergie",
    hex: "#FF6B35",
    usage: "Accents, CTA, éléments interactifs",
  },
  {
    name: "Gris Ciment",
    hex: "#8E8E93",
    usage: "Textes secondaires, séparateurs",
  },
  {
    name: "Beige Urbain",
    hex: "#F5F5F0",
    usage: "Fonds alternatifs, cartes",
  },
];

const typographies = [
  {
    name: "Inter",
    fontFamily: "Inter, sans-serif",
    description: "Typographie principale pour les titres et textes. Moderne, lisible et polyvalente.",
    examples: [
      { text: "URBANA Studio", size: "48px", weight: "700" },
      { text: "Streetwear moderne", size: "24px", weight: "600" },
      { text: "Collection Automne 2024", size: "18px", weight: "400" },
      { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", size: "16px", weight: "400" },
    ],
  },
  {
    name: "Space Grotesk",
    fontFamily: "Space Grotesk, sans-serif",
    description: "Typographie secondaire pour les éléments graphiques et les accents.",
    examples: [
      { text: "URBANA", size: "64px", weight: "700" },
      { text: "STUDIO", size: "32px", weight: "500" },
      { text: "2024", size: "20px", weight: "400" },
    ],
  },
];

const moodboardImages = [
  { id: "1", title: "Architecture urbaine", description: "Lignes épurées et structures modernes" },
  { id: "2", title: "Street style", description: "Mode urbaine et authentique" },
  { id: "3", title: "Minimalisme", description: "Simplicité et élégance" },
  { id: "4", title: "Couleurs vibrantes", description: "Accents orange et contrastes" },
  { id: "5", title: "Typographie bold", description: "Impact visuel fort" },
  { id: "6", title: "Textures", description: "Matériaux et surfaces" },
];

const mockups = [
  {
    id: "1",
    title: "Homepage Web",
    type: "Site Web",
    image: "/branding/urbana/homepage.jpg",
    description: "Page d'accueil du site e-commerce avec navigation épurée et mise en avant des collections",
  },
  {
    id: "2",
    title: "Post Instagram",
    type: "Réseaux Sociaux",
    image: "/branding/urbana/instagram.jpg",
    description: "Format carré optimisé pour Instagram avec identité visuelle cohérente",
  },
  {
    id: "3",
    title: "Affiche Print",
    type: "Print",
    image: "/branding/urbana/poster.jpg",
    description: "Affiche événementielle format A2 avec logo et palette de couleurs",
  },
  {
    id: "4",
    title: "T-shirt",
    type: "Produit",
    image: "/branding/urbana/tshirt.jpg",
    description: "Application du logo sur support textile",
  },
  {
    id: "5",
    title: "Packaging",
    type: "Produit",
    image: "/branding/urbana/packaging.jpg",
    description: "Design de packaging minimaliste et premium",
  },
  {
    id: "6",
    title: "Application Mobile",
    type: "Digital",
    image: "/branding/urbana/mobile.jpg",
    description: "Interface mobile avec navigation intuitive",
  },
];

export default function UrbanaBrandingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [logoRef, logoInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [colorsRef, colorsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [typoRef, typoInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [moodboardRef, moodboardInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [mockupsRef, mockupsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-block p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
                <h1 className="text-7xl md:text-9xl font-black text-gray-900 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  URBANA
                </h1>
                <p className="text-xl text-gray-600 font-semibold">STUDIO</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold mb-6">
                Branding / Identité Visuelle
              </span>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Création d'une identité visuelle complète pour une marque streetwear moderne et unisexe
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section ref={introRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-orange-500/10 rounded-xl">
                <Target className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contexte & Objectif</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">URBANA Studio</strong> est une marque streetwear fictive 
                    positionnée comme une marque haut de gamme accessible, inspirée par la culture urbaine et le minimalisme.
                  </p>
                  <p>
                    L'objectif était de créer une identité visuelle cohérente et professionnelle qui reflète les valeurs 
                    de la marque : <strong className="text-gray-900">authenticité</strong>, <strong className="text-gray-900">simplicité</strong>, 
                    <strong className="text-gray-900">créativité</strong> et <strong className="text-gray-900">modernité</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Positionnement
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Streetwear contemporain</li>
                  <li>• Unisexe</li>
                  <li>• Haut de gamme accessible</li>
                  <li>• Culture urbaine & minimalisme</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Cible
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 18-35 ans</li>
                  <li>• Urbains</li>
                  <li>• Sensibles au design</li>
                  <li>• Actifs sur réseaux sociaux</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Section */}
      <section ref={logoRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={logoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Layers className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl font-bold text-gray-900">Logo</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Logo typographique minimal et impactant, adapté au web et au print
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={logoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-gray-900 rounded-3xl p-12 flex items-center justify-center"
            >
              <div className="text-center">
                <h3 className="text-6xl font-black text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  URBANA
                </h3>
                <p className="text-xl text-gray-400 font-semibold">STUDIO</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={logoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-3xl p-12 flex items-center justify-center border-2 border-gray-200"
            >
              <div className="text-center">
                <h3 className="text-6xl font-black text-gray-900 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  URBANA
                </h3>
                <p className="text-xl text-gray-600 font-semibold">STUDIO</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={logoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Variantes :</strong> Logo principal, version monochrome, icône favicon
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Colors Section */}
      <section ref={colorsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={colorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Palette className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl font-bold text-gray-900">Palette de Couleurs</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Palette limitée et cohérente, optimisée pour le digital et le print
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color, index) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                hex={color.hex}
                usage={color.usage}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section ref={typoRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={typoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Type className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl font-bold text-gray-900">Typographies</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choix de typographies modernes, lisibles et adaptées au web
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {typographies.map((typo, index) => (
              <TypographyPreview
                key={typo.name}
                name={typo.name}
                fontFamily={typo.fontFamily}
                description={typo.description}
                examples={typo.examples}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Moodboard Section */}
      <section ref={moodboardRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={moodboardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <ImageIcon className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl font-bold text-gray-900">Moodboard</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Inspirations visuelles et direction artistique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodboardImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={moodboardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-semibold">{image.title}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-500">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockups Section */}
      <section ref={mockupsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mockupsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Layers className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl font-bold text-gray-900">Mockups</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Applications de l'identité visuelle sur différents supports
            </p>
          </motion.div>

          <MockupGallery mockups={mockups} />
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Compétences Mobilisées</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Design</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Direction artistique</li>
                  <li>• Création de logo</li>
                  <li>• Design de palette</li>
                  <li>• Choix typographique</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Production</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Moodboard & recherches</li>
                  <li>• Création de mockups</li>
                  <li>• Cohérence graphique</li>
                  <li>• Application multi-supports</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
