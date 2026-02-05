"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Settings2 } from "lucide-react";
import CanvasAnimation from "@/components/visual-soundscape/CanvasAnimation";
import ControlsPanel from "@/components/visual-soundscape/ControlsPanel";

export default function VisualSoundscapePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settings, setSettings] = useState({
    colorPrimary: "#3b82f6",
    colorSecondary: "#8b5cf6",
    speed: 1,
    particleSize: 3,
    density: 50,
    rotation: 0,
  });
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Visual Soundscape
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Expérience audiovisuelle interactive générée entièrement par code
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Les formes, couleurs et animations réagissent au mouvement de la souris, au scroll et aux clics,
            simulant un paysage sonore visuel immersif.
          </p>
        </motion.div>
      </section>

      {/* Main Canvas Section */}
      <section className="relative min-h-[80vh] px-4 pb-20">
        <div
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ height: isFullscreen ? "100vh" : "70vh" }}
        >
          <CanvasAnimation
            isPlaying={isPlaying}
            settings={settings}
            className="w-full h-full"
          />

          {/* Controls Overlay */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetAnimation}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all"
              aria-label="Reset"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all"
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-white" />
              ) : (
                <Maximize2 className="w-5 h-5 text-white" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowControls(!showControls)}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all"
              aria-label="Toggle controls"
            >
              <Settings2 className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Controls Panel */}
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-4 right-4 z-20"
            >
              <ControlsPanel settings={settings} onSettingsChange={setSettings} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Concept & Technologie
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Visual Soundscape</strong> est une expérience audiovisuelle
                interactive générée entièrement par code, sans fichiers audio ou vidéo externes.
              </p>
              <p>
                L&apos;animation simule un paysage sonore visuel où les particules, formes géométriques et
                dégradés réagissent dynamiquement aux interactions utilisateur.
              </p>
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Fonctionnalités principales :</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Animation générative avec particules et formes géométriques</li>
                <li>Réactivité au mouvement de la souris, au scroll et aux clics</li>
                <li>Simulation d&apos;ondes sonores visuelles</li>
                <li>Palette de réglages en temps réel (couleurs, vitesse, densité)</li>
                <li>Mode plein écran pour une expérience immersive</li>
                <li>Animations fluides et bouclées</li>
              </ul>
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Technologies utilisées :</h3>
              <div className="flex flex-wrap gap-2">
                {["Canvas API", "React", "TypeScript", "Framer Motion", "WebGL", "Mathématiques génératives"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
