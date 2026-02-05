"use client";

import Link from "next/link";
import { useFitness } from "./context/FitnessContext";
import { motion } from "framer-motion";
import { LayoutDashboard, Lightbulb, ArrowRight } from "lucide-react";

export default function FitnessHomePage() {
  const { user } = useFitness();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-wellness-brown text-wellness-off-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(143,175,154,0.12)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(0,0,0,0.12)_0%,transparent_50%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-wellness-off-white mb-4"
          >
            FitTrack
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-xl sm:text-2xl text-wellness-off-white/90 italic tracking-tight mb-8"
          >
            Avancer, doucement. Mais profondément.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-wellness-off-white/70 text-base sm:text-lg max-w-xl mb-10"
          >
            Une application de bien-être pour suivre tes séances, tes objectifs et ta progression. Sans pression. À ton rythme.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            {user ? (
              <Link
                href="/fitness/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-wellness-off-white text-wellness-brown rounded-xl font-medium hover:bg-wellness-off-white/90 transition-colors duration-300"
              >
                <LayoutDashboard className="w-5 h-5" />
                Accéder au tableau de bord
              </Link>
            ) : (
              <Link
                href="/fitness/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-wellness-off-white text-wellness-brown rounded-xl font-medium hover:bg-wellness-off-white/90 transition-colors duration-300"
              >
                Se connecter
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Liens rapides */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-xl font-medium text-wellness-brown tracking-tight mb-8"
        >
          Découvrir
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/fitness/conseils"
              className="block rounded-2xl border border-wellness-sage/20 bg-wellness-off-white p-6 hover:border-wellness-sage/40 transition-colors duration-300 group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-wellness-sage/15 flex items-center justify-center text-wellness-sage-muted text-xl group-hover:bg-wellness-sage/25 transition-colors duration-300">
                  <Lightbulb className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-medium text-wellness-brown group-hover:text-wellness-brown/90">
                    Conseils Nutrition & Motivation
                  </h3>
                  <p className="text-sm text-wellness-brown/60 mt-0.5">
                    Articles et astuces bien-être
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-wellness-brown/40 group-hover:text-wellness-sage-muted ml-auto transition-colors" />
              </div>
            </Link>
          </motion.div>
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/fitness/dashboard"
                className="block rounded-2xl border border-wellness-sage/20 bg-wellness-off-white p-6 hover:border-wellness-sage/40 transition-colors duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-xl bg-wellness-sage/15 flex items-center justify-center text-wellness-sage-muted text-xl group-hover:bg-wellness-sage/25 transition-colors duration-300">
                    <LayoutDashboard className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="font-medium text-wellness-brown group-hover:text-wellness-brown/90">
                      Tableau de bord
                    </h3>
                    <p className="text-sm text-wellness-brown/60 mt-0.5">
                      Tes séances, objectifs et stats
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-wellness-brown/40 group-hover:text-wellness-sage-muted ml-auto transition-colors" />
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
