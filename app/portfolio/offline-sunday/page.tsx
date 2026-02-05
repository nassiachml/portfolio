"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  MessageSquare, Palette, Globe, Image as ImageIcon, 
  FileText, Target, Users, Coffee, Book, Sun,
  Instagram, Printer, Sparkles
} from "lucide-react";
import OfflineExperience from "@/components/campaign/OfflineExperience";

const rituals = [
  {
    icon: Coffee,
    title: "Café du matin",
    description: "Prendre le temps de savourer, sans écran",
  },
  {
    icon: Book,
    title: "Lecture",
    description: "Un livre, un carnet, un moment à soi",
  },
  {
    icon: Sun,
    title: "Balade",
    description: "Marcher sans destination, juste être",
  },
];

const socialPosts = [
  {
    id: "1",
    type: "Instagram Feed",
    title: "No plans. Just vibes.",
    description: "Post lifestyle minimaliste avec lumière naturelle",
    color: "from-amber-100 to-stone-100",
  },
  {
    id: "2",
    type: "Instagram Feed",
    title: "This Sunday is offline",
    description: "Visuel éditorial avec typographie serif",
    color: "from-green-50 to-amber-50",
  },
  {
    id: "3",
    type: "Instagram Story",
    title: "Sunday Ritual",
    description: "Format story lifestyle avec rituel du dimanche",
    color: "from-stone-100 to-amber-100",
  },
  {
    id: "4",
    type: "Instagram Feed",
    title: "Slow is the new cool",
    description: "Post texte pleine page inspirant",
    color: "from-amber-50 to-green-50",
  },
  {
    id: "5",
    type: "Instagram Story",
    title: "Aujourd'hui, on ne prévoit rien",
    description: "Message doux et non-injonctif",
    color: "from-stone-50 to-amber-50",
  },
  {
    id: "6",
    type: "Instagram Feed",
    title: "Dimanche, on ralentit",
    description: "Visuel lifestyle avec objets du quotidien",
    color: "from-green-100 to-stone-100",
  },
];

const brandColors = [
  { name: "Beige Doux", hex: "#F5F1EB", usage: "Fonds principaux" },
  { name: "Crème", hex: "#FAF8F3", usage: "Fonds alternatifs" },
  { name: "Brun Chaleureux", hex: "#8B7355", usage: "Textes principaux" },
  { name: "Vert Sauge", hex: "#9CAF88", usage: "Accents naturels" },
];

export default function OfflineSundayPage() {
  const [showExperience, setShowExperience] = useState(false);
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [conceptRef, conceptInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [artRef, artInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [siteRef, siteInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [socialRef, socialInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [printRef, printInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-stone-50/50 to-white">
      <OfflineExperience isActive={showExperience} onClose={() => setShowExperience(false)} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-12"
            >
              <h1 
                className="text-7xl md:text-9xl font-light mb-6 tracking-tight text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                OFFLINE
              </h1>
              <h2 
                className="text-6xl md:text-8xl font-light mb-8 tracking-tight text-amber-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                SUNDAY
              </h2>
              <div className="w-32 h-px bg-amber-700/30 mx-auto mb-8" />
              <p className="text-2xl text-amber-700/80 font-light max-w-2xl mx-auto">
                Campagne de communication lifestyle
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12"
            >
              <h3 
                className="text-4xl md:text-5xl font-light mb-8 leading-relaxed max-w-3xl mx-auto text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Le dimanche n'est pas fait pour performer.
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowExperience(true)}
                className="px-10 py-5 bg-amber-900 text-white font-medium rounded-xl hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl"
              >
                Adopter le OFFLINE SUNDAY
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problématique */}
      <section ref={conceptRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={conceptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-amber-700" />
              <h2 
                className="text-4xl md:text-5xl font-light text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Problématique & Concept
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={conceptInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-amber-50/50 rounded-2xl p-8 border border-amber-100"
            >
              <h3 className="text-2xl font-semibold mb-4 text-amber-900">Problématique</h3>
              <p className="text-amber-800/80 leading-relaxed text-lg">
                Les jeunes actifs vivent à 100 à l'heure, même le week-end. 
                Comment revaloriser le temps lent sans être moralisateur ?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={conceptInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-stone-50/50 rounded-2xl p-8 border border-stone-100"
            >
              <h3 className="text-2xl font-semibold mb-4 text-amber-900">Big Idea</h3>
              <p 
                className="text-3xl font-light mb-6 leading-tight text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                "Le dimanche n'est pas fait pour performer."
              </p>
              <p className="text-amber-800/80 leading-relaxed">
                Créer un rendez-vous symbolique : le dimanche OFFLINE. 
                Un concept de marque lifestyle qui valorise le temps lent 
                et les rituels du dimanche.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={conceptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 bg-white rounded-2xl p-8 border border-amber-100"
          >
            <h3 className="text-2xl font-semibold mb-6 text-amber-900">Objectifs</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Sparkles className="w-6 h-6 text-amber-700 mb-3" />
                <p className="font-semibold text-amber-900 mb-2">Créer une tendance</p>
                <p className="text-amber-800/70 text-sm">Installer un concept de marque lifestyle</p>
              </div>
              <div>
                <Target className="w-6 h-6 text-amber-700 mb-3" />
                <p className="font-semibold text-amber-900 mb-2">Donner envie</p>
                <p className="text-amber-800/70 text-sm">Adopter un rituel du dimanche</p>
              </div>
              <div>
                <Users className="w-6 h-6 text-amber-700 mb-3" />
                <p className="font-semibold text-amber-900 mb-2">Créer de l'adhésion</p>
                <p className="text-amber-800/70 text-sm">Pas vendre, mais inspirer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direction Artistique */}
      <section ref={artRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={artInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-8 h-8 text-amber-700" />
              <h2 
                className="text-4xl md:text-5xl font-light text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Direction Artistique
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={artInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-amber-100"
            >
              <h3 className="text-xl font-semibold mb-6 text-amber-900">Palette</h3>
              <div className="grid grid-cols-2 gap-4">
                {brandColors.map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div
                      className="w-full h-20 rounded-lg border border-amber-100"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-medium text-amber-900">{color.name}</p>
                    <p className="text-xs text-amber-700/60 font-mono">{color.hex}</p>
                    <p className="text-xs text-amber-800/70">{color.usage}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={artInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border border-amber-100"
            >
              <h3 className="text-xl font-semibold mb-6 text-amber-900">Style</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-amber-900 mb-2">Minimal • Chaleureux • Editorial</p>
                  <p className="text-sm text-amber-800/70">Esthétique lifestyle premium</p>
                </div>
                <div>
                  <p className="font-medium text-amber-900 mb-2">Typographies</p>
                  <p className="text-sm text-amber-800/70 mb-2">Serif élégante (magazine)</p>
                  <p 
                    className="text-2xl font-light"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Playfair Display
                  </p>
                  <p className="text-sm text-amber-800/70 mt-4 mb-2">Sans-serif moderne</p>
                  <p className="text-lg font-light">Inter</p>
                </div>
                <div>
                  <p className="font-medium text-amber-900 mb-2">Visuels</p>
                  <p className="text-sm text-amber-800/70">
                    Lumière naturelle • Cafés • Livres • Balade • Carnet • Soleil
                  </p>
                  <p className="text-sm text-amber-800/70 italic mt-2">
                    Aucun écran visible
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={artInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 border border-amber-100"
          >
            <h3 className="text-xl font-semibold mb-6 text-amber-900">Ton & Message</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-amber-50/50 rounded-xl">
                <p className="font-semibold text-amber-900 mb-2">Doux</p>
                <p className="text-sm text-amber-800/70">Non-injonctif, inspirant</p>
              </div>
              <div className="p-4 bg-amber-50/50 rounded-xl">
                <p className="font-semibold text-amber-900 mb-2">Inspirant</p>
                <p className="text-sm text-amber-800/70">Donner envie, pas imposer</p>
              </div>
              <div className="p-4 bg-amber-50/50 rounded-xl">
                <p className="font-semibold text-amber-900 mb-2">Lifestyle</p>
                <p className="text-sm text-amber-800/70">Culture urbaine & slow life</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-amber-100">
              <p className="text-sm text-amber-800/60 mb-3">Exemples de messages :</p>
              <div className="space-y-2">
                <p className="text-lg font-light text-amber-900">« Aujourd'hui, on ne prévoit rien. »</p>
                <p className="text-lg font-light text-amber-900">« Dimanche, on ralentit. »</p>
                <p className="text-lg font-light text-amber-900">« Moins faire. Mieux être. »</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini-site */}
      <section ref={siteRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={siteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-amber-700" />
              <h2 
                className="text-4xl md:text-5xl font-light text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Mini-site Éditorial
              </h2>
            </div>
            <p className="text-amber-800/70 text-lg">
              Site type magazine, pas commercial. Focus sur le contenu et l'inspiration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={siteInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 md:p-12 border border-amber-100"
          >
            <div className="aspect-video bg-white rounded-xl flex items-center justify-center mb-8 border border-amber-100">
              <div className="text-center">
                <Book className="w-16 h-16 text-amber-700/40 mx-auto mb-4" />
                <p className="text-amber-800/60">Aperçu mini-site éditorial</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-amber-900">Sections principales</h3>
                <ul className="space-y-3 text-amber-800/80">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">•</span>
                    <span>Manifeste OFFLINE SUNDAY</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">•</span>
                    <span>Citation inspirante animée</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">•</span>
                    <span>Playlist fictive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">•</span>
                    <span>Rituel du dimanche (3 idées)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">•</span>
                    <span>CTA : "Adopter le OFFLINE SUNDAY"</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-amber-100">
                <h3 className="text-xl font-semibold mb-4 text-amber-900">Rituels du dimanche</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {rituals.map((ritual, index) => {
                    const Icon = ritual.icon;
                    return (
                      <motion.div
                        key={ritual.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={siteInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-white rounded-xl p-6 border border-amber-100"
                      >
                        <Icon className="w-8 h-8 text-amber-700 mb-3" />
                        <h4 className="font-semibold text-amber-900 mb-2">{ritual.title}</h4>
                        <p className="text-sm text-amber-800/70">{ritual.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Réseaux Sociaux */}
      <section ref={socialRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Instagram className="w-8 h-8 text-amber-700" />
              <h2 
                className="text-4xl md:text-5xl font-light text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Brand Content
              </h2>
            </div>
            <p className="text-amber-800/70 text-lg">
              Déclinaison Instagram : Feed lifestyle et Stories "Sunday Ritual"
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={socialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`aspect-square bg-gradient-to-br ${post.color} flex items-center justify-center p-8`}>
                  <div className="text-center">
                    <div className="text-4xl mb-4">☕</div>
                    <p 
                      className="text-amber-900 font-light text-lg"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {post.title}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-amber-700/60 mb-2 uppercase">{post.type}</p>
                  <p className="text-sm text-amber-800/70">{post.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Print */}
      <section ref={printRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={printInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Printer className="w-8 h-8 text-amber-700" />
              <h2 
                className="text-4xl md:text-5xl font-light text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Affiche & Print
              </h2>
            </div>
            <p className="text-amber-800/70 text-lg">
              Affiche urbaine minimaliste avec message simple et logo OFFLINE SUNDAY
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={printInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 border border-amber-100"
          >
            <div className="aspect-[3/4] bg-white rounded-xl flex items-center justify-center border-2 border-amber-100">
              <div className="text-center p-8">
                <h3 
                  className="text-5xl font-light mb-4 text-amber-900"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  OFFLINE
                </h3>
                <h3 
                  className="text-5xl font-light mb-8 text-amber-800"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  SUNDAY
                </h3>
                <div className="w-24 h-px bg-amber-700/30 mx-auto mb-8" />
                <p 
                  className="text-2xl font-light mb-12 text-amber-900"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Dimanche, on ralentit.
                </p>
                <div className="flex justify-center gap-3 text-amber-700/40">
                  <Coffee size={24} />
                  <Book size={24} />
                  <Sun size={24} />
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-amber-800/60 mt-6 italic">
              Aucun call to action agressif • Message simple et inspirant
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bilan Communication */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-amber-700" />
              <h2 
                className="text-4xl md:text-5xl font-light text-amber-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Bilan de Communication
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-amber-100"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-amber-900">
                <Users className="w-6 h-6 text-amber-700" />
                Cible
              </h3>
              <ul className="space-y-3 text-amber-800/80">
                <li>• 20-35 ans</li>
                <li>• Urbains</li>
                <li>• Créatifs, freelances, étudiants</li>
                <li>• Sensibles à l'esthétique & au lifestyle</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border border-amber-100"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-amber-900">
                <Target className="w-6 h-6 text-amber-700" />
                Impact Attendu
              </h3>
              <p className="text-amber-800/80 leading-relaxed mb-4">
                Créer une tendance lifestyle autour du dimanche offline. 
                Installer un concept de marque qui valorise le temps lent 
                et inspire à adopter des rituels du dimanche.
              </p>
              <p className="text-amber-800/60 italic text-sm">
                Communication responsable • Brand content • Culture de marque
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
