"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ControlsPanelProps {
  settings: {
    colorPrimary: string;
    colorSecondary: string;
    speed: number;
    particleSize: number;
    density: number;
    rotation: number;
  };
  onSettingsChange: (settings: ControlsPanelProps["settings"]) => void;
}

export default function ControlsPanel({ settings, onSettingsChange }: ControlsPanelProps) {
  const updateSetting = (key: keyof typeof settings, value: number | string) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/80 backdrop-blur-md rounded-xl p-6 border border-white/20 min-w-[280px]"
    >
      <h3 className="text-lg font-semibold mb-4 text-white">Réglages</h3>

      <div className="space-y-4">
        {/* Color Primary */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Couleur principale</label>
          <input
            type="color"
            value={settings.colorPrimary}
            onChange={(e) => updateSetting("colorPrimary", e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>

        {/* Color Secondary */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Couleur secondaire</label>
          <input
            type="color"
            value={settings.colorSecondary}
            onChange={(e) => updateSetting("colorSecondary", e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>

        {/* Speed */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Vitesse: {settings.speed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={settings.speed}
            onChange={(e) => updateSetting("speed", parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Particle Size */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Taille particules: {settings.particleSize.toFixed(0)}px
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={settings.particleSize}
            onChange={(e) => updateSetting("particleSize", parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Density */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Densité: {settings.density}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={settings.density}
            onChange={(e) => updateSetting("density", parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

        {/* Rotation */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Rotation: {settings.rotation.toFixed(0)}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="5"
            value={settings.rotation}
            onChange={(e) => updateSetting("rotation", parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
