"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Palette, Type, Image as ImageIcon, Layers, Sparkles, 
  Target, Heart, Leaf, Sun, Moon
} from "lucide-react";
import ColorPalette from "@/components/branding/ColorPalette";
import TypographyPreview from "@/components/branding/TypographyPreview";
import MockupGallery from "@/components/branding/MockupGallery";
import MoodboardGrid from "@/components/branding/MoodboardGrid";

const colors = [
  {
    name: "Beige Lumière",
    hex: "#F5F1EB",
    usage: "Fonds principaux, espaces de respiration",
  },
  {
    name: "Vert Sauge",
    hex: "#9CAF88",
    usage: "Accents naturels, éléments organiques",
  },
  {
    name: "Ivoire Doux",
    hex: "#FAF8F3",
    usage: "Fonds alternatifs, cartes élégantes",
  },
  {
    name: "Brun Chaleureux",
    hex: "#8B7355",
    usage: "Textes principaux, éléments structurants",
  },
  {
    name: "Doré Subtil",
    hex: "#D4AF37",
    usage: "Accents premium, détails luxueux",
  },
];

const typographies = [
  {
    name: "Playfair Display",
    fontFamily: "Playfair Display, serif",
    description: "Typographie serif élégante pour les titres. Inspirée des classiques, elle apporte raffinement et intemporalité.",
    examples: [
      { text: "LUMINAÊ", size: "56px", weight: "700" },
      { text: "Bien-être holistique", size: "32px", weight: "600" },
      { text: "Centre de soins", size: "24px", weight: "400" },
      { text: "Retrouvez votre équilibre", size: "20px", weight: "400" },
    ],
  },
  {
    name: "Inter",
    fontFamily: "Inter, sans-serif",
    description: "Typographie sans-serif légère pour les textes. Optimale pour la lisibilité et la respiration visuelle.",
    examples: [
      { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", size: "16px", weight: "400" },
      { text: "Découvrez nos soins holistiques", size: "18px", weight: "500" },
      { text: "Réservation en ligne", size: "14px", weight: "400" },
    ],
  },
];

const moodboardImages = [
  { 
    id: "1", 
    title: "Textures naturelles", 
    description: "Lin, pierre, bois brut pour une authenticité organique",
    category: "Matériaux"
  },
  { 
    id: "2", 
    title: "Lumière douce", 
    description: "Éclairage naturel et apaisant, ambiance sereine",
    category: "Ambiance"
  },
  { 
    id: "3", 
    title: "Silhouettes calmes", 
    description: "Poses de yoga, méditation, moments de détente",
    category: "Lifestyle"
  },
  { 
    id: "4", 
    title: "Espaces épurés", 
    description: "Minimalisme et respiration, design zen",
    category: "Architecture"
  },
  { 
    id: "5", 
    title: "Palette douce", 
    description: "Nuances beige, vert sauge, tons naturels",
    category: "Couleurs"
  },
  { 
    id: "6", 
    title: "Détails premium", 
    description: "Finitions soignées, qualité haut de gamme",
    category: "Esthétique"
  },
];

const mockups = [
  {
    id: "1",
    title: "Page d'accueil",
    type: "Site Web",
    image: "/branding/luminae/homepage.jpg",
    description: "Page d'accueil du site avec navigation élégante et mise en avant des soins holistiques",
  },
  {
    id: "2",
    title: "Carte de visite",
    type: "Print",
    image: "/branding/luminae/business-card.jpg",
    description: "Carte de visite premium avec finitions dorées et texture naturelle",
  },
  {
    id: "3",
    title: "Post Instagram",
    type: "Réseaux Sociaux",
    image: "/branding/luminae/instagram.jpg",
    description: "Format carré optimisé pour Instagram avec esthétique apaisante",
  },
  {
    id: "4",
    title: "Affiche bien-être",
    type: "Print",
    image: "/branding/luminae/poster.jpg",
    description: "Affiche événementielle format A2 avec typographie élégante",
  },
];

export default function LuminaeBrandingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [logoRef, logoInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [colorsRef, colorsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [typoRef, typoInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [moodboardRef, moodboardInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [mockupsRef, mockupsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-stone-50/50 to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-amber-50/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="inline-block p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-amber-100/50">
                <h1 
                  className="text-8xl md:text-9xl font-bold text-amber-900 mb-4 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  LUMINAÊ
                </h1>
                <div className="flex items-center justify-center gap-2 text-amber-700">
                  <Leaf className="w-5 h-5" />
                  <p className="text-lg font-light">Centre de bien-être & soins holistiques</p>
                  <Leaf className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-6 py-3 bg-amber-100/50 text-amber-800 rounded-full text-sm font-medium mb-8 border border-amber-200/50">
                Branding / Identité Visuelle
              </span>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Identité visuelle élégante et apaisante pour un centre de bien-être premium
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section ref={introRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm p-10 md:p-16 border border-amber-100/50"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-amber-100/30 rounded-2xl">
                <Heart className="w-7 h-7 text-amber-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                  Contexte & Objectif
                </h2>
                <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                  <p>
                    <strong className="text-gray-800">LUMINAÊ</strong> est un centre de bien-être fictif 
                    spécialisé dans les soins holistiques, le yoga et la méditation. L'identité visuelle 
                    devait refléter les valeurs de la marque : <strong className="text-gray-800">sérénité</strong>, 
                    <strong className="text-gray-800">équilibre</strong>, <strong className="text-gray-800">authenticité</strong> 
                    et <strong className="text-gray-800">élégance</strong>.
                  </p>
                  <p>
                    L'objectif était de créer une direction artistique douce et premium, éloignée des codes 
                    streetwear, pour démontrer la polyvalence graphique et la capacité à s'adapter à différents univers.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-amber-100">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <Sun className="w-5 h-5 text-amber-600" />
                  Positionnement
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Haut de gamme & naturel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Apaisant & intemporel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Élégance discrète</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5 text-amber-600" />
                  Cible
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>25-50 ans, actifs urbains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Sensibles au bien-être</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Recherche d'équilibre</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Section */}
      <section ref={logoRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={logoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Layers className="w-8 h-8 text-amber-600" />
              <h2 
                className="text-5xl font-bold text-gray-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Logo
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Logo typographique élégant avec accent circonflexe, inspiré de la lumière et de la nature
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={logoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-3xl p-16 flex items-center justify-center border border-amber-100/50 shadow-sm"
            >
              <div className="text-center">
                <h3 
                  className="text-7xl font-bold text-amber-900 mb-3 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  LUMINAÊ
                </h3>
                <p className="text-lg text-amber-700 font-light">Centre de bien-être</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={logoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-br from-stone-800 to-amber-900 rounded-3xl p-16 flex items-center justify-center shadow-lg"
            >
              <div className="text-center">
                <h3 
                  className="text-7xl font-bold text-amber-50 mb-3 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  LUMINAÊ
                </h3>
                <p className="text-lg text-amber-100 font-light">Centre de bien-être</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={logoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-amber-50/50 rounded-2xl p-6 border border-amber-100/50">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Variantes :</strong> Logo principal, version simplifiée, 
                variante monochrome, icône favicon
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Colors Section */}
      <section ref={colorsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={colorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Palette className="w-8 h-8 text-amber-600" />
              <h2 
                className="text-5xl font-bold text-gray-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Palette de Couleurs
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Palette douce et naturelle, inspirée des éléments organiques
            </p>
          </motion.div>

          <ColorPalette colors={colors} />
        </div>
      </section>

      {/* Typography Section */}
      <section ref={typoRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={typoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Type className="w-8 h-8 text-amber-600" />
              <h2 
                className="text-5xl font-bold text-gray-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Typographies
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Combinaison serif élégante et sans-serif légère pour raffinement et lisibilité
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
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
      <section ref={moodboardRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={moodboardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <ImageIcon className="w-8 h-8 text-amber-600" />
              <h2 
                className="text-5xl font-bold text-gray-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Moodboard
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Inspirations visuelles pour créer une ambiance sereine et premium
            </p>
          </motion.div>

          <MoodboardGrid images={moodboardImages} />
        </div>
      </section>

      {/* Mockups Section */}
      <section ref={mockupsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mockupsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Layers className="w-8 h-8 text-amber-600" />
              <h2 
                className="text-5xl font-bold text-gray-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Mockups
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Applications de l'identité visuelle sur différents supports
            </p>
          </motion.div>

          <MockupGallery mockups={mockups} />
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm p-10 md:p-16 border border-amber-100/50"
          >
            <h2 
              className="text-4xl font-bold text-gray-800 mb-8"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Compétences Mobilisées
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  Design
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Direction artistique douce & premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Création de logo élégant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Palette de couleurs apaisante</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Choix typographique raffiné</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
                  <Moon className="w-5 h-5 text-amber-600" />
                  Production
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Moodboard & recherches visuelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Création de mockups premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Cohérence graphique multi-supports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Polyvalence d'univers graphique</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
