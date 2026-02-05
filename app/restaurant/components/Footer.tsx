"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white border-t-2 border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold tracking-tight">🌸 SAKURA</div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              L'art culinaire japonais à Troyes
            </p>
            <p className="text-white/60 text-xs">
              Restaurant japonais authentique proposant une cuisine raffinée et traditionnelle depuis 2015.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 text-yellow-300">
              Navigation
            </h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <Link href="/restaurant" className="hover:text-yellow-300 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/restaurant/menu" className="hover:text-yellow-300 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/restaurant/reservation" className="hover:text-yellow-300 transition-colors">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/restaurant/about" className="hover:text-yellow-300 transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 text-yellow-300">
              Horaires
            </h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Lun - Dim: 12h - 14h30</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Lun - Dim: 19h - 22h30</span>
              </li>
              <li className="text-white/60 text-xs mt-2">
                Fermé le lundi soir
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 text-yellow-300">
              Contact
            </h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>12 Rue de la Cité<br />10000 Troyes, France</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+33325123456" className="hover:text-yellow-300 transition-colors">
                  +33 3 25 12 34 56
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@sakura-troyes.fr" className="hover:text-yellow-300 transition-colors">
                  contact@sakura-troyes.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 SAKURA. Tous droits réservés. Site fictif créé à des fins de démonstration.
          </p>
          <Link
            href="/#portfolio"
            className="text-white/60 hover:text-yellow-300 text-sm uppercase tracking-wider transition-colors"
          >
            ← Retour au portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}

