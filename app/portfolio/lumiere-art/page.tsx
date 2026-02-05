"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  MessageSquare, Palette, Globe, Image as ImageIcon, 
  FileText, Target, Users, Sparkles, Calendar,
  Instagram, Printer, Lightbulb, Images
} from "lucide-react";
import ArtworkExplorer from "@/components/campaign/ArtworkExplorer";
import ArtistCarousel from "@/components/campaign/ArtistCarousel";

const artworks = [
  {
    id: "1",
    title: "Éclats de Lumière",
    artist: "Sophie Martin",
    type: "peinture" as const,
    description: "Série de peintures abstraites explorant la lumière et l'ombre à travers des couleurs vives et des contrastes saisissants.",
    quote: "La lumière révèle ce que l'ombre cache.",
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Métamorphose",
    artist: "Lucas Dubois",
    type: "sculpture" as const,
    description: "Installation sculpturale en métal et verre qui transforme la lumière naturelle en une œuvre évolutive.",
    quote: "L'art est une métamorphose perpétuelle.",
    color: "#4ECDC4",
  },
  {
    id: "3",
    title: "Résurgence",
    artist: "Emma Laurent",
    type: "installation" as const,
    description: "Installation immersive combinant lumière, son et mouvement pour créer une expérience sensorielle unique.",
    quote: "Chaque instant est une résurgence de sens.",
    color: "#FFE66D",
  },
  {
    id: "4",
    title: "Horizons Perdus",
    artist: "Thomas Moreau",
    type: "peinture" as const,
    description: "Peintures paysagères contemporaines jouant sur les perspectives et les lumières crépusculaires.",
    quote: "L'horizon n'est qu'une illusion de perspective.",
    color: "#A8E6CF",
  },
  {
    id: "5",
    title: "Équilibre Fragile",
    artist: "Léa Bernard",
    type: "sculpture" as const,
    description: "Sculptures en équilibre explorant la fragilité et la résilience à travers des formes organiques.",
    quote: "L'équilibre est un art de vivre.",
    color: "#FF8B94",
  },
  {
    id: "6",
    title: "Résonances",
    artist: "Marc Petit",
    type: "installation" as const,
    description: "Installation interactive où la lumière réagit aux mouvements des visiteurs, créant une danse lumineuse.",
    quote: "La lumière résonne avec l'émotion.",
    color: "#95E1D3",
  },
];

const artists = [
  {
    id: "1",
    name: "Sophie Martin",
    specialty: "Peinture abstraite",
    bio: "Artiste contemporaine reconnue pour ses explorations de la lumière et de la couleur. Ses œuvres ont été exposées dans de nombreuses galeries européennes.",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "Lucas Dubois",
    specialty: "Sculpture & Installation",
    bio: "Sculpteur français spécialisé dans les installations lumineuses. Son travail questionne la relation entre matière et lumière.",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "Emma Laurent",
    specialty: "Installation immersive",
    bio: "Artiste pluridisciplinaire créant des expériences sensorielles uniques. Ses installations ont été présentées dans des festivals internationaux.",
    color: "#FFE66D",
  },
];

const socialPosts = [
  {
    id: "1",
    type: "Instagram Carousel",
    title: "Éclats de Lumière",
    description: "Carousel lifestyle présentant les œuvres du festival",
    color: "from-red-500 to-pink-500",
  },
  {
    id: "2",
    type: "Instagram Story",
    title: "Artiste du jour",
    description: "Story focus sur Sophie Martin et son processus créatif",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "3",
    type: "Instagram Feed",
    title: "Behind the scenes",
    description: "Visuel montrant l'installation des œuvres",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "4",
    type: "Instagram Story",
    title: "Découvrir le festival",
    description: "Story avec CTA vers la landing page",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "5",
    type: "Instagram Carousel",
    title: "Programme du festival",
    description: "Carousel présentant le programme jour par jour",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "6",
    type: "Instagram Feed",
    title: "Lumière sur l'Art",
    description: "Post principal avec message fort et date",
    color: "from-indigo-500 to-purple-500",
  },
];

const brandColors = [
  { name: "Noir Profond", hex: "#0A0A0A", usage: "Fonds principaux" },
  { name: "Blanc Lumineux", hex: "#FFFFFF", usage: "Textes et contrastes" },
  { name: "Rouge Vif", hex: "#FF6B6B", usage: "Accent peinture" },
  { name: "Cyan Électrique", hex: "#4ECDC4", usage: "Accent sculpture" },
  { name: "Jaune Lumineux", hex: "#FFE66D", usage: "Accent installation" },
];

export default function LumiereArtPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [conceptRef, conceptInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [artRef, artInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [programRef, programInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [artistsRef, artistsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [socialRef, socialInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [printRef, printInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          {/* Animated background lights */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                  LUMIÈRE
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-cyan-500 to-yellow-500">
                  SUR L'ART
                </span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-cyan-500 to-yellow-500 mx-auto mb-6" />
              <p className="text-2xl md:text-3xl font-light text-gray-300 mb-4">
                Festival d'Art Contemporain
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>15-20 Juin 2024</span>
                <span>•</span>
                <span>Paris, Centre Culturel</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12"
            >
              <h2 
                className="text-3xl md:text-4xl font-light mb-8 leading-relaxed max-w-3xl mx-auto text-gray-200"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Chaque œuvre a sa lumière,<br />
                chaque visiteur son moment.
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-black font-bold rounded-xl hover:shadow-2xl transition-all shadow-lg"
                >
                  Découvrir le festival
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  S'inscrire à la newsletter
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Concept */}
      <section ref={conceptRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={conceptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-cyan-500" />
              <h2 className="text-4xl md:text-5xl font-bold">Concept & Problématique</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={conceptInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-500">Objectifs</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>Promouvoir un festival d'art contemporain fictif</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>Attirer le public jeune et adulte curieux</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>Créer un univers graphique fort et reconnaissable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>Expérience utilisateur interactive pour renforcer le message</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={conceptInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-500">Big Idea</h3>
              <p 
                className="text-3xl font-light mb-6 leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                "Chaque œuvre a sa lumière, chaque visiteur son moment"
              </p>
              <p className="text-gray-300 leading-relaxed">
                Univers lumineux, poétique et immersif. Contraste clair/obscur et couleurs vives 
                pour chaque œuvre. Transmission d'émotion plutôt que simple information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Direction Artistique */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-8 h-8 text-cyan-500" />
              <h2 className="text-4xl md:text-5xl font-bold">Direction Artistique</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Palette</h3>
              <div className="space-y-3">
                {brandColors.map((color) => (
                  <div key={color.name} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border border-white/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{color.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Typographies</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Titres</p>
                  <p 
                    className="text-2xl font-light"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Playfair Display
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Serif élégant</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Texte</p>
                  <p className="text-lg font-light">Inter</p>
                  <p className="text-xs text-gray-500 mt-1">Sans-serif moderne</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Visuels</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Illustrations stylisées d'œuvres</p>
                <p>• Lumières / néons / ombres</p>
                <p>• Animations : fade in, hover effects</p>
                <p>• Contraste clair/obscur</p>
                <p>• Couleurs vives ponctuelles</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programme / Explorateur */}
      <section ref={programRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={programInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Images className="w-8 h-8 text-cyan-500" />
              <h2 className="text-4xl md:text-5xl font-bold">Explorateur d'Œuvres</h2>
            </div>
            <p className="text-gray-400 text-lg">
              Découvrez les œuvres du festival. Cliquez sur une œuvre pour en savoir plus.
            </p>
          </motion.div>

          <ArtworkExplorer artworks={artworks} />
        </div>
      </section>

      {/* Artistes */}
      <section ref={artistsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={artistsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-cyan-500" />
              <h2 className="text-4xl md:text-5xl font-bold">Artistes Vedettes</h2>
            </div>
            <p className="text-gray-400 text-lg">
              Découvrez les artistes qui illuminent le festival
            </p>
          </motion.div>

          <ArtistCarousel artists={artists} />
        </div>
      </section>

      {/* Preuve Sociale */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ils en parlent</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie D.",
                text: "Une expérience sensorielle incroyable. Les œuvres prennent vie sous la lumière.",
                rating: 5,
              },
              {
                name: "Pierre L.",
                text: "Festival exceptionnel ! La scénographie met parfaitement en valeur chaque œuvre.",
                rating: 5,
              },
              {
                name: "Sophie M.",
                text: "Un moment de pure émotion. L'interaction avec les installations est magique.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black rounded-2xl p-6 border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-white font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-black rounded-2xl p-8 border border-white/10">
              <div className="text-5xl font-black text-cyan-500 mb-2">+2 500</div>
              <p className="text-gray-400">Visiteurs attendus</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Réseaux Sociaux */}
      <section ref={socialRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Instagram className="w-8 h-8 text-cyan-500" />
              <h2 className="text-4xl md:text-5xl font-bold">Brand Content</h2>
            </div>
            <p className="text-gray-400 text-lg">
              Déclinaison Instagram : Carousels lifestyle et Stories animées
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={socialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
              >
                <div className={`aspect-square bg-gradient-to-br ${post.color} flex items-center justify-center p-8`}>
                  <div className="text-center">
                    <div className="text-5xl mb-4">🎨</div>
                    <p className="text-white font-bold text-lg">{post.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase">{post.type}</p>
                  <p className="text-sm text-gray-300">{post.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Print */}
      <section ref={printRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={printInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Printer className="w-8 h-8 text-cyan-500" />
              <h2 className="text-4xl md:text-5xl font-bold">Print</h2>
            </div>
            <p className="text-gray-400 text-lg">
              Affiche A3 et flyer A5 avec QR code vers la landing page
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={printInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-black rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 text-cyan-500">Affiche A3</h3>
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center border-2 border-white/10">
                <div className="text-center p-6">
                  <h4 
                    className="text-4xl font-bold mb-4"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    LUMIÈRE<br />SUR L'ART
                  </h4>
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 via-cyan-500 to-yellow-500 mx-auto mb-4" />
                  <p className="text-lg text-gray-300 mb-6">15-20 Juin 2024</p>
                  <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-xs text-gray-500">QR code</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={printInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-black rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 text-cyan-500">Flyer A5</h3>
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center border-2 border-white/10">
                <div className="text-center p-4">
                  <h4 
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    LUMIÈRE<br />SUR L'ART
                  </h4>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 via-cyan-500 to-yellow-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-300 mb-4">15-20 Juin 2024</p>
                  <p className="text-xs text-gray-400 mb-4">Festival d'Art Contemporain</p>
                  <div className="w-12 h-12 bg-white/10 rounded mx-auto mb-3 flex items-center justify-center">
                    <span className="text-lg">📱</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bilan Communication */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-cyan-500" />
              <h2 className="text-4xl md:text-5xl font-bold">Bilan de Communication</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-500">
                <Users className="w-6 h-6" />
                Cible
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>• 18-45 ans</li>
                <li>• Amateurs d'art et culture</li>
                <li>• Urbains, actifs sur les réseaux sociaux</li>
                <li>• Sensibles à l'esthétique et au design</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-500">
                <Target className="w-6 h-6" />
                Impact Attendu
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Créer un univers graphique fort et reconnaissable pour le festival. 
                L'expérience interactive immersive renforce le message et crée une 
                connexion émotionnelle avec le public.
              </p>
              <p className="text-gray-400 italic text-sm">
                Storytelling visuel • Interaction immersive • Cohérence graphique
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
