"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface DeliveryOption {
  value: "standard" | "rapide" | "urgent";
  label: string;
  duration: string;
  price: number;
}

const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    value: "standard",
    label: "Standard",
    duration: "4 semaines",
    price: 0,
  },
  {
    value: "rapide",
    label: "Rapide",
    duration: "2 semaines",
    price: 300,
  },
  {
    value: "urgent",
    label: "Urgent",
    duration: "1 semaine",
    price: 600,
  },
];

interface DeliverySelectProps {
  value: "standard" | "rapide" | "urgent";
  onChange: (value: "standard" | "rapide" | "urgent") => void;
}

export default function DeliverySelect({
  value,
  onChange,
}: DeliverySelectProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
        <Clock size={16} />
        Délai de livraison
      </label>
      <div className="grid grid-cols-3 gap-3">
        {DELIVERY_OPTIONS.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-4 rounded-xl border-2 transition-all ${
              value === option.value
                ? "border-bordeaux-500 bg-bordeaux-900/20"
                : "border-dark-border bg-dark-card/50 hover:border-bordeaux-600/50"
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <h4 className="font-semibold text-white mb-1">{option.label}</h4>
              <p className="text-xs text-gray-400 mb-2">{option.duration}</p>
              {option.price > 0 ? (
                <p className="text-sm font-bold text-bordeaux-400">
                  +{option.price.toLocaleString("fr-FR")} €
                </p>
              ) : (
                <p className="text-sm text-gray-500">Inclus</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
