"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  PricingConfig,
  calculatePrice,
  BASE_PRICES,
  OPTION_PRICES,
  PAGE_PRICE,
} from "@/lib/pricing";
import ProjectTypeCard, { PROJECT_TYPES } from "@/components/simulator/ProjectTypeCard";
import PriceSlider from "@/components/simulator/PriceSlider";
import OptionCheckbox from "@/components/simulator/OptionCheckbox";
import DeliverySelect from "@/components/simulator/DeliverySelect";
import PriceSummary from "@/components/simulator/PriceSummary";
import {
  Palette,
  Mail,
  Lock,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";

export default function SimulatorPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [config, setConfig] = useState<PricingConfig>({
    projectType: "vitrine",
    pages: 5,
    design: false,
    form: false,
    auth: false,
    payment: false,
    admin: false,
    delivery: "standard",
  });

  const totalPrice = calculatePrice(config);

  const updateConfig = (updates: Partial<PricingConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Simulateur de Prix</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Estimez le coût de votre projet digital en quelques clics. Le prix
            se met à jour en temps réel selon vos besoins.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Type de projet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-4">Type de projet</h2>
              <div className="space-y-3">
                {PROJECT_TYPES.map((type) => (
                  <ProjectTypeCard
                    key={type.type}
                    type={type.type}
                    label={type.label}
                    icon={type.icon}
                    price={type.price}
                    isSelected={config.projectType === type.type}
                    isPopular={type.isPopular}
                    onSelect={(type) => updateConfig({ projectType: type })}
                  />
                ))}
              </div>
            </motion.div>

            {/* Nombre de pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <PriceSlider
                label="Nombre de pages"
                value={config.pages}
                min={1}
                max={20}
                unit="pages"
                pricePerUnit={PAGE_PRICE}
                onChange={(value) => updateConfig({ pages: value })}
              />
            </motion.div>

            {/* Design personnalisé */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-4">Options de design</h2>
              <OptionCheckbox
                label="Design personnalisé"
                description="Identité visuelle sur-mesure avec charte graphique"
                price={OPTION_PRICES.design}
                isChecked={config.design}
                onChange={(checked) => updateConfig({ design: checked })}
                icon={<Palette size={20} />}
              />
            </motion.div>

            {/* Fonctionnalités avancées */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Fonctionnalités avancées
              </h2>
              <div className="space-y-3">
                <OptionCheckbox
                  label="Formulaire de contact"
                  description="Formulaire sécurisé avec notifications email"
                  price={OPTION_PRICES.form}
                  isChecked={config.form}
                  onChange={(checked) => updateConfig({ form: checked })}
                  icon={<Mail size={20} />}
                />
                <OptionCheckbox
                  label="Authentification utilisateur"
                  description="Système de connexion/inscription sécurisé"
                  price={OPTION_PRICES.auth}
                  isChecked={config.auth}
                  onChange={(checked) => updateConfig({ auth: checked })}
                  icon={<Lock size={20} />}
                />
                <OptionCheckbox
                  label="Paiement en ligne"
                  description="Intégration Stripe/PayPal pour transactions"
                  price={OPTION_PRICES.payment}
                  isChecked={config.payment}
                  onChange={(checked) => updateConfig({ payment: checked })}
                  icon={<CreditCard size={20} />}
                />
                <OptionCheckbox
                  label="Tableau de bord admin"
                  description="Interface d'administration complète"
                  price={OPTION_PRICES.admin}
                  isChecked={config.admin}
                  onChange={(checked) => updateConfig({ admin: checked })}
                  icon={<LayoutDashboard size={20} />}
                />
              </div>
            </motion.div>

            {/* Délai de livraison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <DeliverySelect
                value={config.delivery}
                onChange={(value) => updateConfig({ delivery: value })}
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
