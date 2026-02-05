"use client";

import { motion } from "framer-motion";
import { Monitor, ShoppingCart, Smartphone } from "lucide-react";
import { ProjectType } from "@/lib/pricing";

interface ProjectTypeCardProps {
  type: ProjectType;
  label: string;
  icon: React.ReactNode;
  price: number;
  isSelected: boolean;
  isPopular?: boolean;
  onSelect: (type: ProjectType) => void;
}

export default function ProjectTypeCard({
  type,
  label,
  icon,
  price,
  isSelected,
  isPopular,
  onSelect,
}: ProjectTypeCardProps) {
  return (
    <motion.button
      onClick={() => onSelect(type)}
      className={`relative w-full p-6 rounded-2xl border-2 transition-all text-left ${
        isSelected
          ? "border-bordeaux-500 bg-bordeaux-900/20 shadow-lg shadow-bordeaux-900/30"
          : "border-dark-border bg-dark-card/50 hover:border-bordeaux-600/50"
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {isPopular && (
        <span className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full">
          Populaire
        </span>
      )}
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-xl ${
            isSelected
              ? "bg-gradient-bordeaux"
              : "bg-dark-surface border border-dark-border"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{label}</h3>
          <p className="text-2xl font-bold text-bordeaux-400">
            {price.toLocaleString("fr-FR")} €
          </p>
          <p className="text-sm text-gray-400 mt-1">Prix de base</p>
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-bordeaux-500 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

export const PROJECT_TYPES = [
  {
    type: "vitrine" as ProjectType,
    label: "Site vitrine",
    icon: <Monitor className="text-white" size={24} />,
    price: 800,
  },
  {
    type: "ecommerce" as ProjectType,
    label: "Site e-commerce",
    icon: <ShoppingCart className="text-white" size={24} />,
    price: 1500,
    isPopular: true,
  },
  {
    type: "mobile" as ProjectType,
    label: "Application mobile",
    icon: <Smartphone className="text-white" size={24} />,
    price: 2500,
  },
];
