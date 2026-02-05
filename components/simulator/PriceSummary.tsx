"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { PricingConfig, calculatePrice, formatPrice } from "@/lib/pricing";
import { Check, FileText } from "lucide-react";

interface PriceSummaryProps {
  config: PricingConfig;
  totalPrice: number;
}

export default function PriceSummary({ config, totalPrice }: PriceSummaryProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const displayPrice = useTransform(spring, (value) => Math.round(value));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    spring.set(totalPrice);
  }, [totalPrice, spring]);

  useEffect(() => {
    const unsubscribe = displayPrice.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [displayPrice]);

  const projectTypeLabels = {
    vitrine: "Site vitrine",
    ecommerce: "Site e-commerce",
    mobile: "Application mobile",
  };

  const deliveryLabels = {
    standard: "Standard (4 semaines)",
    rapide: "Rapide (2 semaines)",
    urgent: "Urgent (1 semaine)",
  };

  const selectedOptions = [
    config.design && "Design personnalisé",
    config.form && "Formulaire de contact",
    config.auth && "Authentification utilisateur",
    config.payment && "Paiement en ligne",
    config.admin && "Tableau de bord admin",
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 sticky top-24"
    >
      <div className="flex items-center gap-2 mb-6">
        <FileText className="text-bordeaux-400" size={20} />
        <h3 className="text-xl font-bold">Récapitulatif</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Type de projet</p>
          <p className="font-semibold text-white">
            {projectTypeLabels[config.projectType]}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Nombre de pages</p>
          <p className="font-semibold text-white">{config.pages} pages</p>
        </div>

        {selectedOptions.length > 0 && (
          <div>
            <p className="text-sm text-gray-400 mb-2">Options sélectionnées</p>
            <div className="space-y-1">
              {selectedOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check className="text-bordeaux-400" size={14} />
                  <span>{option}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm text-gray-400 mb-1">Délai de livraison</p>
          <p className="font-semibold text-white">
            {deliveryLabels[config.delivery]}
          </p>
        </div>

        <div className="pt-4 border-t border-dark-border">
          <p className="text-sm text-gray-400 mb-1">Responsive</p>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 rounded text-xs font-semibold">
              Inclus
            </span>
            Mobile & Tablette
          </p>
        </div>
      </div>

      <div className="pt-6 border-t-2 border-bordeaux-500/30">
        <p className="text-sm text-gray-400 mb-2">Prix total</p>
        <motion.p
          className="text-4xl font-bold text-gradient"
          key={totalPrice}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {formatPrice(displayValue)}
        </motion.p>
      </div>
    </motion.div>
  );
}
