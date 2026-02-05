"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ProductConfig,
  calculateProductPrice,
  BASE_PRICE,
  OPTION_PRICES,
} from "@/lib/product-pricing";
import ProductPreview from "@/components/configurator/ProductPreview";
import ColorSelector from "@/components/configurator/ColorSelector";
import SizeSelector from "@/components/configurator/SizeSelector";
import MaterialSelector from "@/components/configurator/MaterialSelector";
import OptionCheckbox from "@/components/configurator/OptionCheckbox";
import PackagingSelector from "@/components/configurator/PackagingSelector";
import PriceSummary from "@/components/configurator/PriceSummary";
import { Sparkles, Scissors, Shield } from "lucide-react";

export default function ConfiguratorPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [config, setConfig] = useState<ProductConfig>({
    color: "blanc",
    size: 42,
    material: "toile",
    logo: false,
    text: false,
    sole: false,
    packaging: "standard",
  });

  const totalPrice = calculateProductPrice(config);

  const updateConfig = (updates: Partial<ProductConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-dark-bg py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Configurateur de Produit</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Personnalisez vos sneakers streetwear en temps réel. Choisissez les
            couleurs, matières et options pour créer le produit parfait.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="px-4 py-2 bg-gradient-bordeaux rounded-full text-sm font-semibold text-white">
              Prix de base : {BASE_PRICE.toLocaleString("fr-FR")} €
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Aperçu produit */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-6 text-center">
                Aperçu du produit
              </h2>
              <ProductPreview
                color={config.color}
                material={config.material}
              />
            </motion.div>
          </div>

          {/* Colonne centrale - Options */}
          <div className="lg:col-span-1 space-y-6">
            {/* Couleur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <ColorSelector
                selectedColor={config.color}
                onColorChange={(color) => updateConfig({ color })}
              />
            </motion.div>

            {/* Taille */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <SizeSelector
                selectedSize={config.size}
                onSizeChange={(size) => updateConfig({ size })}
              />
            </motion.div>

            {/* Matière */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <MaterialSelector
                selectedMaterial={config.material}
                onMaterialChange={(material) => updateConfig({ material })}
              />
            </motion.div>

            {/* Options personnalisation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-sm font-semibold text-gray-300 mb-4">
                Personnalisation
              </h2>
              <div className="space-y-3">
                <OptionCheckbox
                  label="Logo brodé"
                  description="Logo personnalisé brodé sur le côté"
                  price={OPTION_PRICES.logo}
                  isChecked={config.logo}
                  onChange={(checked) => updateConfig({ logo: checked })}
                  icon={<Sparkles size={18} />}
                  color="emerald"
                />
                <OptionCheckbox
                  label="Texte personnalisé"
                  description="Ajoutez votre texte sur la semelle"
                  price={OPTION_PRICES.text}
                  isChecked={config.text}
                  onChange={(checked) => updateConfig({ text: checked })}
                  icon={<Scissors size={18} />}
                  color="orange"
                />
                <OptionCheckbox
                  label="Semelle renforcée"
                  description="Semelle plus résistante et durable"
                  price={OPTION_PRICES.sole}
                  isChecked={config.sole}
                  onChange={(checked) => updateConfig({ sole: checked })}
                  icon={<Shield size={18} />}
                  color="pink"
                />
              </div>
            </motion.div>

            {/* Packaging */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass rounded-2xl p-6"
            >
              <PackagingSelector
                selectedPackaging={config.packaging}
                onPackagingChange={(packaging) =>
                  updateConfig({ packaging })
                }
              />
            </motion.div>
          </div>

          {/* Colonne droite - Récapitulatif */}
          <div className="lg:col-span-1">
            <PriceSummary config={config} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
