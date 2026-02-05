"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-black tracking-tighter">URBAN</div>
              <div className="w-px h-6 bg-white/20" />
              <div className="text-2xl font-light tracking-widest">EDGE</div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Street Style. Your Way.
            </p>
            <p className="text-gray-500 text-xs">
              Marque de vêtements streetwear pour une génération qui ose être elle-même.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/ecommerce" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/ecommerce/products" className="hover:text-white transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/ecommerce/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/ecommerce/privacy" className="hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">
              Informations légales
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/ecommerce/privacy" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li className="text-gray-500">
                SIRET : 123 456 789 00012
              </li>
              <li className="text-gray-500">
                TVA : FR12 345678901
              </li>
              <li className="text-gray-500">
                Siège social : 28 Boulevard Victor Hugo, 10000 Troyes, France
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>28 Boulevard Victor Hugo<br />10000 Troyes, France</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+33325000000" className="hover:text-white transition-colors">
                  +33 3 25 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@urbanedge.com" className="hover:text-white transition-colors">
                  contact@urbanedge.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 URBAN EDGE. Tous droits réservés.
          </p>
          <Link
            href="/#portfolio"
            className="text-gray-500 hover:text-white text-sm uppercase tracking-wider transition-colors"
          >
            ← Retour au portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}

