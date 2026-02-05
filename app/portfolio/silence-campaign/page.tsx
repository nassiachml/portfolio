"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  MessageSquare, Palette, Globe, Image as ImageIcon, 
  FileText, Target, Users, TrendingUp, Pause, 
  Smartphone, Instagram, Printer
} from "lucide-react";
import PauseExperience from "@/components/campaign/PauseExperience";

const stats = [
  { value: "87%", label: "des jeunes se sentent submergés par les notifications" },
  { value: "4h30", label: "temps moyen passé sur le téléphone par jour" },
  { value: "72%", label: "éprouvent de la fatigue mentale liée au digital" },
];

const socialPosts = [
  {
    id: "1",
    type: "Instagram Feed",
    title: "Trop de bruit",
    description: "Post texte plein écran avec message direct",
    color: "from-red-500 to-red-700",
  },
  {
    id: "2",
    type: "Instagram Feed",
    title: "Notifications envahissantes",
    description: "Visuel montrant l'accumulation de notifications",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "3",
    type: "Instagram Feed",
    title: "Écran vide",
    description: "Contraste visuel fort - le silence",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "4",
    type: "Instagram Story",
    title: "Ton téléphone ne se repose jamais",
    description: "Format story avec message percutant",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: "5",
    type: "Instagram Story",
    title: "Et toi ?",
    description: "Question rhétorique pour interpeller",
    color: "from-pink-500 to-pink-700",
  },
  {
    id: "6",
    type: "Instagram Feed",
    title: "Faire une pause",
    description: "Call-to-action vers l'expérience interactive",
    color: "from-green-500 to-green-700",
  },
];

export default function SilenceCampaignPage() {
  const [showPause, setShowPause] = useState(false);
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [conceptRef, conceptInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [landingRef, landingInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [socialRef, socialInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [printRef, printInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen bg-black text-white">
      <PauseExperience isActive={showPause} onClose={() => setShowPause(false)} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-12 gap-1 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="bg-white/5 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
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
              className="mb-8"
            >
              <h1 className="text-8xl md:text-9xl font-black mb-4 tracking-tight">
                SILENCE
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mb-6" />
              <p className="text-2xl md:text-3xl font-light text-gray-300 mb-4">
                Campagne de sensibilisation
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Surcharge numérique & santé mentale chez les jeunes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight max-w-3xl mx-auto">
                Trop de bruit.<br />
                Pas assez de silence.
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPause(true)}
                className="px-10 py-5 bg-white text-black font-black rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 text-lg mx-auto"
              >
                <Pause size={24} />
                Faire une pause de 60 secondes
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Concept & Message */}
      <section ref={conceptRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={conceptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-black">Concept & Message</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={conceptInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-red-500">Big Idea</h3>
              <p className="text-3xl font-black mb-6 leading-tight">
                "Le bruit numérique est invisible, mais il fatigue."
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Le concept repose sur le contraste entre la surcharge numérique constante 
                (notifications, contenus, sollicitations) et le besoin fondamental de silence 
                et de repos mental.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <p className="text-gray-300">Trop de contenu</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <p className="text-gray-300">Trop de notifications</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <p className="text-gray-300">Trop de sollicitations</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">→</span>
                  <p className="text-gray-300 font-semibold">Besoin de silence</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={conceptInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-red-500">Ton & Message</h3>
              <div className="space-y-6">
                <div className="p-6 bg-gray-800 rounded-xl border-l-4 border-red-500">
                  <p className="text-xl font-bold mb-2">Direct</p>
                  <p className="text-gray-300">Minimaliste • Impactant • Émotionnel</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-400 uppercase text-sm">Exemples de slogans</h4>
                  <div className="space-y-3">
                    <p className="text-xl font-bold">« Trop de bruit. Pas assez de silence. »</p>
                    <p className="text-xl font-bold">« Ton téléphone ne se repose jamais. Et toi ? »</p>
                    <p className="text-xl font-bold">« Déconnecter, c'est aussi prendre soin de soi. »</p>
                  </div>
                </div>
              </div>
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
              <Palette className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-black">Direction Artistique</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Palette</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black border-2 border-white rounded" />
                  <span className="text-gray-300">Noir</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded" />
                  <span className="text-gray-300">Blanc</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-600 rounded" />
                  <span className="text-gray-300">Gris</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded" />
                  <span className="text-gray-300">Rouge (accent)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Typographie</h3>
              <p className="text-gray-300 mb-4">Sans-serif moderne</p>
              <div className="space-y-2">
                <p className="text-2xl font-black">Texte serré</p>
                <p className="text-sm text-gray-400">Parfois écrasant</p>
                <p className="text-lg font-bold leading-tight">Impact visuel fort</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Visuels</h3>
              <div className="space-y-3 text-gray-300">
                <p>• Écrans surchargés</p>
                <p>• Notifications empilées</p>
                <p>• Visages fatigués</p>
                <p>• Animations : accumulation → arrêt brutal → silence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Chiffres Clés</h2>
            <p className="text-gray-400">Données de sensibilisation</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-black rounded-xl p-8 border border-gray-800 text-center"
              >
                <div className="text-6xl font-black text-red-500 mb-4">{stat.value}</div>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Landing Page */}
      <section ref={landingRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={landingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-black">Landing Page</h2>
            </div>
            <p className="text-gray-400 text-lg">
              Page éditoriale de sensibilisation avec message fort et call-to-action symbolique
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={landingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <Smartphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">Aperçu landing page</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="text-xl font-bold">Sections principales :</p>
              <ul className="space-y-2 ml-6">
                <li>• Hero avec slogan fort</li>
                <li>• Texte court de sensibilisation</li>
                <li>• Chiffres clés</li>
                <li>• Call To Action : "Faire une pause de 60 secondes"</li>
              </ul>
              <p className="pt-4 text-gray-400 italic">
                Objectif : transmettre le message, pas vendre un produit
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Réseaux Sociaux */}
      <section ref={socialRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Instagram className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-black">Réseaux Sociaux</h2>
            </div>
            <p className="text-gray-400 text-lg">
              Déclinaison Instagram : Feed et Stories avec messages percutants
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={socialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-black rounded-xl overflow-hidden border border-gray-800"
              >
                <div className={`aspect-square bg-gradient-to-br ${post.color} flex items-center justify-center p-8`}>
                  <div className="text-center">
                    <div className="text-4xl mb-4">📱</div>
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
      <section ref={printRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={printInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Printer className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-black">Affiche Print</h2>
            </div>
            <p className="text-gray-400 text-lg">
              Format A3 avec message fort et QR code vers la landing page
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={printInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-black via-gray-900 to-black rounded-xl flex items-center justify-center border-2 border-white/10">
              <div className="text-center p-8">
                <h3 className="text-6xl font-black mb-6">SILENCE</h3>
                <p className="text-2xl font-bold mb-8">Trop de bruit.</p>
                <p className="text-2xl font-bold mb-12">Pas assez de silence.</p>
                <div className="w-32 h-32 bg-white/10 rounded-lg mx-auto mb-6 flex items-center justify-center">
                  <div className="text-4xl">📱</div>
                </div>
                <p className="text-sm text-gray-400">QR code vers landing page</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bilan Communication */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-black">Bilan de Communication</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-black rounded-xl p-8 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-red-500" />
                Objectifs
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Sensibiliser à la fatigue mentale causée par le digital</li>
                <li>• Créer une prise de conscience émotionnelle</li>
                <li>• Inciter à une action simple : faire une pause</li>
                <li>• Faire passer un message, pas vendre un produit</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-black rounded-xl p-8 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-red-500" />
                Cible
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Jeunes adultes 18-30 ans</li>
                <li>• Étudiants / jeunes actifs</li>
                <li>• Très connectés (réseaux sociaux, notifications, écrans)</li>
                <li>• Sensibles aux messages de prévention</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 bg-black rounded-xl p-8 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-red-500" />
                Impact Attendu
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cette campagne vise à créer une prise de conscience collective sur la surcharge numérique 
                et ses effets sur la santé mentale. L'expérience interactive de pause de 60 secondes 
                permet une action concrète et symbolique, renforçant le message de manière mémorable.
              </p>
              <p className="text-gray-400 italic">
                Communication responsable • Message fort • Impact émotionnel
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
