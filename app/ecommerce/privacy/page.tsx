"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>
          <p className="text-gray-400 uppercase tracking-wider text-sm">
            Dernière mise à jour : Décembre 2024
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 text-gray-700 leading-relaxed"
        >
          <section>
            <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">
              1. Collecte des données
            </h2>
            <p className="mb-4">
              URBAN EDGE collecte les données personnelles suivantes lors de
              votre utilisation de notre site :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Adresse postale de livraison</li>
              <li>Numéro de téléphone</li>
              <li>Données de paiement (traitées de manière sécurisée)</li>
              <li>Historique des commandes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">
              2. Utilisation des données
            </h2>
            <p className="mb-4">
              Vos données personnelles sont utilisées pour :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Traiter et expédier vos commandes</li>
              <li>Vous contacter concernant vos commandes</li>
              <li>Améliorer nos services et votre expérience</li>
              <li>Vous envoyer des communications marketing (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">
              3. Protection des données
            </h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et
              organisationnelles appropriées pour protéger vos données
              personnelles contre tout accès non autorisé, perte, destruction ou
              altération.
            </p>
            <p>
              Toutes les transactions de paiement sont sécurisées et cryptées.
              Nous ne stockons pas vos informations de carte bancaire complètes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">
              4. Partage des données
            </h2>
            <p className="mb-4">
              Nous ne vendons jamais vos données personnelles à des tiers. Nous
              pouvons partager vos données uniquement avec :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nos prestataires de services (transporteurs, processeurs de paiement)</li>
              <li>Les autorités légales si requis par la loi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">
              5. Vos droits
            </h2>
            <p className="mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit de retirer votre consentement</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à :{" "}
              <a
                href="mailto:contact@urbanedge.com"
                className="text-black font-bold hover:underline"
              >
                contact@urbanedge.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">
              6. Cookies
            </h2>
            <p className="mb-4">
              Notre site utilise des cookies pour améliorer votre expérience de
              navigation. Vous pouvez gérer vos préférences de cookies dans les
              paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">
              7. Contact
            </h2>
            <p className="mb-4">
              Pour toute question concernant cette politique de confidentialité,
              contactez-nous :
            </p>
            <div className="bg-gray-50 p-6 border-2 border-gray-200">
              <p className="font-bold text-black mb-2">URBAN EDGE</p>
              <p>28 Boulevard Victor Hugo</p>
              <p>10000 Troyes, France</p>
              <p className="mt-2">
                Email :{" "}
                <a
                  href="mailto:contact@urbanedge.com"
                  className="text-black font-bold hover:underline"
                >
                  contact@urbanedge.com
                </a>
              </p>
              <p>
                Téléphone :{" "}
                <a
                  href="tel:+33325000000"
                  className="text-black font-bold hover:underline"
                >
                  +33 3 25 00 00 00
                </a>
              </p>
            </div>
          </section>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/ecommerce"
            className="text-black hover:text-gray-600 uppercase tracking-wider text-sm font-bold"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

