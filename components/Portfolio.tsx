"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Code, Palette, MessageSquare, Video, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ProjectCategory = "développement" | "graphisme" | "communication" | "webtv et loisirs" | "audiovisuel";
type DevSubcategory = "site internet" | "petit code";
type GraphismeSubcategory = "branding" | "web";
type ProjectSubcategory = DevSubcategory | GraphismeSubcategory;

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  subcategory?: ProjectSubcategory;
  description: string;
  image: string;
  link?: string;
  github?: string;
  technologies: string[];
  details: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 25,
    title: "Mini Dashboard Personnel",
    category: "développement",
    subcategory: "petit code",
    description: "Dashboard interactif inspiré des interfaces SaaS permettant de visualiser mon profil de développeuse à travers des statistiques clés, des projets, des compétences et des graphiques animés, le tout sans backend.",
    image: "/projects/dashboard.jpg",
    link: "/dashboard",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Data Visualization"],
    featured: true,
    details: [
      "Dashboard personnel interactif style SaaS",
      "4 cartes de statistiques avec animation count-up :",
      "  • Projets réalisés (34+)",
      "  • Technologies maîtrisées (15+)",
      "  • Années d'expérience (3 ans)",
      "  • Projets actifs (8)",
      "Sélection de 6 projets récents avec détails",
      "Badges 'Fictif' / 'Réel' pour chaque projet",
      "Affichage du type de projet et stack principale",
      "Liens directs vers les projets",
      "Graphique de répartition des projets par catégorie",
      "Visualisation animée : Développement, Graphisme, Communication, WebTV, Audiovisuel",
      "Barres de progression animées pour les technologies",
      "8 technologies principales avec pourcentages :",
      "  • Next.js (90%), React (90%), TypeScript (85%)",
      "  • Symfony (75%), WordPress (80%), PHP (75%)",
      "  • Tailwind CSS (85%), Framer Motion (80%)",
      "Graphique de distribution de la stack :",
      "  • Front-end (45%), Back-end (25%)",
      "  • UI/UX (20%), Audiovisuel (10%)",
      "Animations progressives au chargement",
      "Design moderne avec couleurs variées par section",
      "Micro-interactions sur tous les éléments",
      "Cartes avec effets hover et élévation",
      "Graphiques animés avec transitions fluides",
      "Interface responsive optimisée mobile/tablette/desktop",
      "Données extraites directement du portfolio",
      "Composants modulaires et réutilisables",
      "Expérience utilisateur professionnelle et engageante",
    ],
  },
  {
    id: 21,
    title: "URBAN EDGE - E-commerce Mode Streetwear (Site Fictif)",
    category: "développement",
    subcategory: "site internet",
    description: "Site e-commerce fictif de marque de vêtements streetwear unisexes avec charte graphique moderne inspirée des grandes marques, gestion complète des produits avec tailles et couleurs",
    image: "/projects/ecommerce.jpg",
    link: "/ecommerce",
    technologies: ["Next.js", "React", "TypeScript", "Context API", "LocalStorage", "Framer Motion", "Tailwind CSS"],
    details: [
      "⚠️ Site e-commerce fictif créé à des fins de démonstration",
      "Collection 100% unisexe avec storytelling inclusif et moderne",
      "Marque de vêtements streetwear URBAN EDGE avec charte graphique moderne",
      "Design inspiré des grandes marques (Bershka, Zara) avec identité visuelle forte",
      "12 produits de mode unisexes avec images haute qualité (hoodies, pantalons, tops, vestes)",
      "Gestion complète des tailles (XS à XXL) et couleurs pour chaque produit",
      "Page produit individuelle avec sélection taille/couleur et galerie d'images",
      "Système de favoris fonctionnel avec sauvegarde localStorage",
      "Panier intelligent avec distinction par taille et couleur",
      "Page FAQ complète avec accordéon interactif (8 questions/réponses)",
      "Système d'authentification : admin@urbanedge.com / admin123",
      "Espace admin avec dashboard coloré et statistiques en temps réel",
      "Espace client avec suivi détaillé des commandes (statuts : pending, processing, shipped, delivered)",
      "Page checkout avec formulaire de livraison et sélection mode de paiement",
      "Navigation moderne avec barre de recherche et menu mobile",
      "Hero section full-screen avec image de fond et CTA",
      "Section storytelling unisexe avec message inclusif",
      "Black Friday intégré avec promotions visuelles",
      "Design noir/blanc avec accents rose (pink-500) pour une identité forte",
      "Typographie bold et uppercase pour un style streetwear",
      "Responsive design optimisé mobile/tablette/desktop",
      "Gestion d'état avec Context API et persistance localStorage",
      "Page politique de confidentialité complète",
    ],
  },
  {
    id: 34,
    title: "FitTrack - Application Bien-être / Fitness (Site Fictif)",
    category: "développement",
    subcategory: "site internet",
    description: "Application web fictive de suivi fitness : séances, nutrition, objectifs, routines et réservation de coachs. Tableau de bord personnalisé avec graphiques Chart.js, thème wellness vert/bleu.",
    image: "/projects/fitness.jpg",
    link: "/fitness",
    technologies: ["Next.js", "React", "TypeScript", "Context API", "Framer Motion", "Tailwind CSS"],
    details: [
      "⚠️ Application fictive créée à des fins de démonstration",
      "Tableau de bord personnalisé : progression, calories, poids, IMC, temps d'entraînement, objectifs",
      "Graphiques interactifs (CSS) : calories par semaine, répartition des types de séances, objectifs atteints vs totaux",
      "Suivi des objectifs : création, modification, progression (perte de poids, prise de muscle, endurance)",
      "Suggestions de routines par niveau : débutant, intermédiaire, avancé avec exercices détaillés",
      "Réservation de coachs : liste des coachs, tarifs, spécialités, créneaux disponibles",
      "Paiement simulé (sandbox) pour réserver une séance avec un coach",
      "Profil utilisateur : âge, poids, taille, niveau, historique des séances et objectifs",
      "Section Nutrition : calories brûlées, conseils bien-être",
      "Authentification : connexion par email ou sélection d'un compte de démo",
      "Design mobile-first, couleurs vert / bleu clair / blanc (ambiance wellness)",
      "Navigation : Dashboard, Séances, Nutrition, Objectifs, Routines, Coachs, Profil",
      "Types TypeScript pour User, Session, Goal, Routine, Coach",
      "Structure modulable pour évolution mobile et intégration Firebase (Firestore + Auth)",
    ],
  },
  {
    id: 22,
    title: "SAKURA - Restaurant Japonais (Site Fictif)",
    category: "développement",
    subcategory: "site internet",
    description: "Site complet pour restaurant japonais fictif avec menu interactif, système de réservation, commandes en avance, gestion des allergènes et espace admin",
    image: "/projects/restaurant.jpg",
    link: "/restaurant",
    technologies: ["Next.js", "React", "TypeScript", "Context API", "LocalStorage", "Framer Motion", "Tailwind CSS"],
    details: [
      "⚠️ Site fictif créé à des fins de démonstration",
      "Restaurant japonais SAKURA avec identité visuelle rouge/or et design élégant",
      "20 plats authentiques avec images haute qualité (sushis, makis, ramen, entrées, desserts, boissons)",
      "Affichage détaillé des allergènes pour chaque plat avec codes couleurs",
      "Filtres par catégorie (Sushis, Makis, Plats chauds, Entrées, Desserts, Boissons)",
      "Filtres végétarien et épicé pour faciliter la recherche",
      "Système de favoris avec sauvegarde localStorage",
      "Panier intelligent avec gestion des quantités",
      "Système de réservation de table avec sélection date/heure/nombre de personnes",
      "Commande en avance avec choix entre 'à emporter' et 'sur place'",
      "Sélection d'heure de retrait pour les commandes à emporter",
      "Espace client avec suivi des commandes (statuts : pending, preparing, ready, completed)",
      "Espace admin complet avec dashboard et statistiques",
      "Gestion des commandes : mise à jour des statuts en temps réel",
      "Gestion des réservations : confirmation/annulation",
      "Page 'À propos' avec histoire du restaurant et horaires d'ouverture",
      "Horaires détaillés affichés (déjeuner et dîner)",
      "Informations de contact complètes (adresse, téléphone, email)",
      "Design moderne avec palette rouge/or et accents jaune",
      "Typographie élégante et lisible",
      "Responsive design optimisé mobile/tablette/desktop",
      "Gestion d'état avec Context API et persistance localStorage",
      "Système d'authentification : admin@sakura-troyes.fr / admin123",
      "Compte client : client@sakura-troyes.fr / client123",
      "Navigation intuitive avec compteurs panier et favoris",
      "Hero section avec image de fond et call-to-action",
      "Section spécialités avec sélection de plats mis en avant",
    ],
  },
  {
    id: 1,
    title: "AS Chartreux Troyes",
    category: "développement",
    subcategory: "site internet",
    description: "Site officiel du club AS Chartreux avec système d'inscription et de dons en ligne",
    image: "/projects/aschartreux.jpg",
    link: "https://aschartreux.fr",
    technologies: ["WordPress", "PHP", "Stripe", "CSS3"],
    details: [
      "Conception et développement sur-mesure",
      "Intégration système d'inscription en ligne",
      "Système de dons avec paiement sécurisé",
      "Plugins WordPress personnalisés",
      "Design responsive et moderne",
    ],
  },
  {
    id: 2,
    title: "Centre Culturel des Chartreux",
    category: "développement",
    subcategory: "site internet",
    description: "Refonte complète du site WordPress avec plugin personnalisé, système d'inscription en ligne et paiement sécurisé via Stripe et PayPal",
    image: "/projects/3c-chartreux.jpg",
    link: "https://3c-chartreux.fr",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "Stripe", "PayPal", "Istiqbal-101"],
    details: [
      "Refonte complète du site avec le thème Istiqbal-101",
      "Développement d'un plugin personnalisé pour l'inscription",
      "Formulaire d'inscription avec validation et sauvegarde en base",
      "Paiement en ligne simulé (mode sandbox) via Stripe et PayPal",
      "Redirection après paiement avec mail de confirmation",
      "Espace élève sécurisé (connexion/inscription, parcours choisi, horaires, devoirs)",
      "Travail sur l'UX/UI et le responsive design",
      "Optimisation SEO et mise en ligne sur Hostinger",
    ],
  },
  {
    id: 3,
    title: "Makto Design",
    category: "développement",
    subcategory: "site internet",
    description: "Site vitrine responsive pour graphiste avec portfolio et formulaires personnalisés",
    image: "/projects/maktodesign.jpg",
    link: "https://maktodesign.com",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
    details: [
      "Site vitrine responsive",
      "Formulaires personnalisés (contact et devis)",
      "Mise en avant du portfolio",
      "Page RGPD et optimisation SEO",
      "UX/UI optimisée",
    ],
  },
  {
    id: 4,
    title: "Affiches Sira Masterclass",
    category: "graphisme",
    description: "Création de visuels et affiches pour les réseaux sociaux",
    image: "/projects/sira-graphisme.jpg",
    technologies: ["Photoshop", "Illustrator", "Figma"],
    details: [
      "Création de contenu visuel",
      "Affiches promotionnelles",
      "Posts réseaux sociaux",
      "Identité visuelle cohérente",
    ],
  },
  {
    id: 5,
    title: "Remise des diplômes IUT de Troyes",
    category: "audiovisuel",
    description: "Cadreuse pour la cérémonie de remise des diplômes 2024 de l'IUT de Troyes, utilisant la caméra Blackmagic positionnée face à la scène",
    image: "/projects/remise-diplomes.jpg",
    link: "https://www.youtube.com/live/we3V68sSJYQ?si=i2r4ooe3hM4LINpA",
    technologies: ["Blackmagic", "Caméras PTZ", "OBS", "Son", "Éclairage"],
    details: [
      "Cadreuse principale avec caméra Blackmagic face à la scène",
      "Captation des discours et moments clés de la cérémonie",
      "Coordination avec équipe multi-caméras (2 PTZ, 2 Blackmagic, caméra mobile)",
      "Réception d'instructions en temps réel via casques",
      "Installation du matériel avant l'événement",
      "Diffusion en direct sur la chaîne YouTube de l'IUT",
      "Collaboration avec HZ Événementiel",
    ],
  },
  {
    id: 6,
    title: "Festival Premières Marches",
    category: "webtv et loisirs",
    description: "Cheffe & Tech plateau pour la cérémonie de clôture",
    image: "/projects/premieres-marches.jpg",
    technologies: ["Blackmagic", "Son", "Éclairage", "OBS"],
    details: [
      "Cheffe de plateau",
      "Gestion technique complète",
      "Coordination équipe",
      "Captation événement majeur",
    ],
  },
  {
    id: 7,
    title: "TEDxUTT 2024",
    category: "webtv et loisirs",
    description: "Cheffe & Tech plateau pour émission et interview",
    image: "/projects/tedx.jpg",
    technologies: ["Multi-caméras", "OBS", "Son professionnel"],
    details: [
      "Cheffe de plateau",
      "Interface régie/plateau",
      "Résolution problèmes techniques",
      "Captation événement live",
    ],
  },
  {
    id: 8,
    title: "Contenus réseaux sociaux",
    category: "communication",
    description: "Community management et création de contenu pour Sira Masterclass",
    image: "/projects/communication.jpg",
    technologies: ["Photoshop", "Illustrator", "Canva"],
    details: [
      "Stratégie de contenu",
      "Création visuels",
      "Planning éditorial",
      "Engagement communauté",
    ],
  },
  {
    id: 9,
    title: "Refonte du site Cinéma Utopia",
    category: "développement",
    subcategory: "site internet",
    description: "Refonte du site du cinéma Utopia de Pont-Sainte-Marie à Troyes en travail de groupe, développé avec SCSS, HTML et Symfony",
    image: "/projects/utopia-cinema.jpg",
    link: "https://mmi23b12.sae301dev.ovh/",
    technologies: ["Symfony", "SCSS", "HTML5", "PHP"],
    details: [
      "Refonte complète du site du cinéma Utopia",
      "Conception d'une interface utilisateur moderne, intuitive et responsive",
      "Mise en place des animations et de la mise en page grâce à SCSS",
      "Création d'une identité visuelle cohérente avec illustrations et photos",
      "Section Films avec informations détaillées",
      "Page Tarifs claire et concise",
      "Page Contact avec formulaire dédié",
      "Mise en avant des événements spéciaux (soirées débats, séances dégustation, rencontres avec artistes)",
      "Organisation pour séances groupées et projets pédagogiques",
    ],
  },
  {
    id: 10,
    title: "CinéTalk : Live et gestion technique",
    category: "audiovisuel",
    description: "Gestion technique et graphique de l'émission CinéTalk, un live sur Twitch dédié aux discussions cinématographiques",
    image: "/projects/cinetalk.jpg",
    link: "https://www.twitch.tv/cine_talk",
    technologies: ["Twitch", "OBS", "After Effects", "Canva", "Premiere Pro", "Photoshop"],
    details: [
      "Création et gestion du compte Twitch avec configuration des alertes",
      "Configuration et gestion d'OBS pour la diffusion en direct",
      "Animation du chat en temps réel avec interaction publique",
      "Conception des éléments visuels : overlays, logo, bannières, vidéo d'attente",
      "Création des transitions (intro et outro)",
      "Montage vidéo : raccordement des plans, synchronisation audio/vidéo",
      "Gestion de la sonorisation et de l'éclairage",
      "Opération d'une caméra lors du tournage",
      "Coordination avec invités (cascadeur professionnel et cinéphile)",
      "Rediffusion sur YouTube disponible",
    ],
  },
  {
    id: 11,
    title: "Publicité BMW 320D",
    category: "audiovisuel",
    description: "Réalisation d'une publicité pour la BMW 320D E90 avec captation dynamique et esthétique produit",
    image: "/projects/bmw-publicite.jpg",
    link: "https://youtu.be/Gya6nkiuA4A",
    technologies: ["Caméra Sony", "Premiere Pro", "Montage vidéo"],
    details: [
      "Captation dynamique : prises de vue en mouvement",
      "Séquences en ligne droite et dans les virages",
      "Mise en valeur de la maniabilité et des performances",
      "Réalisation d'un packshot final pour présenter les détails du design",
      "Montage fluide et captivant",
      "Transmission de l'élégance et de la puissance du véhicule",
      "Affinement des compétences en cadrage, mise en scène et storytelling visuel",
    ],
  },
  {
    id: 12,
    title: "Refonte identité visuelle - Club d'Escalade Devers Troyes",
    category: "graphisme",
    description: "Refonte complète de l'identité visuelle du Club d'Escalade Devers Troyes pour moderniser l'image du club et refléter son dynamisme et son esprit communautaire",
    image: "/projects/devers-identite.jpg",
    technologies: ["Photoshop", "Illustrator", "Design graphique"],
    details: [
      "Analyse et diagnostic de l'identité visuelle existante",
      "Création d'un logotype inspiré des formes low poly, représentant l'alliance entre nature et environnement indoor",
      "Utilisation des initiales du club pour renforcer la reconnaissance de la marque",
      "Définition d'une palette de couleurs : Jaune (enthousiasme), Bleu (stabilité), Violet (créativité), Rouge (passion)",
      "Sélection de typographies : Gill Sans MT pour la clarté, Bebas Neue pour le dynamisme",
      "Direction photographique : mise en avant des grimpeurs dans des environnements lumineux et dynamiques",
      "Déclinaison de la charte graphique sur supports print et digital",
      "Création de maquettes pour visualiser l'application (affiches, réseaux sociaux, vêtements)",
      "Cohérence graphique adaptée à divers supports de communication",
      "Expérience visuelle immersive pour fédérer les membres et attirer de nouveaux adhérents",
    ],
  },
  {
    id: 13,
    title: "Jeu de cartes Toy Story",
    category: "développement",
    subcategory: "petit code",
    description: "Interface web dynamique avec cartes interactives représentant les personnages de Toy Story, incluant animations fluides et chargement dynamique des données",
    image: "/projects/toystory-cartes.jpg",
    link: "/toystory",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Fetch API", "JSON"],
    details: [
      "Développement d'une interface web dynamique et interactive avec Next.js",
      "Affichage de cartes représentant les personnages de Toy Story",
      "Chaque carte contient : image, nom, description et statistiques (vie, discrétion, action)",
      "Chargement dynamique des données depuis un fichier JSON avec Fetch API",
      "Gestion flexible et évolutive des données",
      "Animations visuelles fluides avec Framer Motion",
      "Effet d'élévation et zoom sur l'image des cartes au survol",
      "Animation de rotation du logo au survol",
      "Barres de progression animées pour les statistiques",
      "Design responsive avec Tailwind CSS",
      "Interface esthétique avec dégradés et effets de verre (glassmorphism)",
      "Expérience utilisateur immersive et moderne",
    ],
  },
  {
    id: 14,
    title: "Générateur de Palettes de Couleurs",
    category: "développement",
    subcategory: "petit code",
    description: "Application web interactive pour générer et explorer des palettes de couleurs harmonieuses avec fonctionnalités de copie et génération aléatoire",
    image: "/projects/palette-generator.jpg",
    link: "/palette-generator",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Fetch API"],
    details: [
      "Générateur de palettes de couleurs interactif et dynamique",
      "Bibliothèque de 10 palettes prédéfinies avec noms thématiques",
      "Génération aléatoire de nouvelles palettes de 5 couleurs",
      "Copie des codes couleurs au clic avec notification visuelle",
      "Affichage visuel des palettes avec cartes interactives",
      "Sélection de palettes depuis la bibliothèque",
      "Animations fluides avec Framer Motion",
      "Effets de survol avec zoom et élévation",
      "Design moderne avec glassmorphism et dégradés",
      "Interface responsive et intuitive",
      "Feedback visuel lors de la copie (icône de validation)",
      "Expérience utilisateur engageante pour designers et développeurs",
    ],
  },
  {
    id: 15,
    title: "Générateur de Citations Inspirantes",
    category: "développement",
    subcategory: "petit code",
    description: "Application web minimaliste et élégante pour découvrir des citations inspirantes avec filtres par catégories et fonctionnalité de copie",
    image: "/projects/quote-generator.jpg",
    link: "/quote-generator",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    details: [
      "Générateur de citations avec design minimaliste et élégant",
      "Bibliothèque de 20 citations inspirantes de personnalités célèbres",
      "Filtrage par catégories : motivation, développement, design, travail, créativité, apprentissage",
      "Génération aléatoire de citations avec animations fluides",
      "Fonctionnalité de copie avec feedback visuel",
      "Design épuré avec tons neutres (slate/gris) et beaucoup d'espace blanc",
      "Typographie élégante et lisible",
      "Animations subtiles et raffinées",
      "Interface responsive et accessible",
      "Expérience utilisateur apaisante et inspirante",
      "Transitions douces entre les citations",
      "Design qui met l'accent sur le contenu et la lisibilité",
    ],
  },
  {
    id: 16,
    title: "Dashboard Analytics Interactif",
    category: "développement",
    subcategory: "petit code",
    description: "Dashboard analytics complet avec visualisations de données interactives, graphiques animés et métriques en temps réel",
    image: "/projects/analytics-dashboard.jpg",
    link: "/analytics-dashboard",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Data Visualization"],
    details: [
      "Dashboard analytics professionnel avec visualisations de données",
      "4 cartes de statistiques avec animations de compteurs",
      "Graphiques en barres animés pour l'évolution des utilisateurs et revenus",
      "Visualisation des sources de trafic avec barres de progression",
      "Répartition des types d'appareils (Mobile, Desktop, Tablet)",
      "Tableau des pages les plus visitées avec taux de rebond",
      "Animations fluides et progressives pour tous les éléments",
      "Design moderne avec dégradés indigo/purple",
      "Interface responsive avec grille adaptative",
      "Tooltips interactifs au survol des graphiques",
      "Calculs et animations de valeurs en temps réel",
      "Expérience utilisateur professionnelle et engageante",
    ],
  },
  {
    id: 17,
    title: "Memory Game - Jeu de Mémoire",
    category: "développement",
    subcategory: "petit code",
    description: "Jeu de mémoire interactif avec design dark mode cyberpunk, animations 3D, système de niveaux et effets visuels avancés",
    image: "/projects/memory-game.jpg",
    link: "/memory-game",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Game Logic"],
    details: [
      "Jeu de mémoire complet avec logique de jeu avancée",
      "Design dark mode avec thème cyberpunk (cyan, purple, pink)",
      "Animations 3D pour le retournement des cartes",
      "3 niveaux de difficulté : Easy (8 cartes), Medium (12), Hard (16)",
      "Système de score avec compteur de mouvements",
      "Chronomètre en temps réel",
      "Effets de particules lors des matchs",
      "Animations de fond avec étoiles animées",
      "Modal de victoire avec animations",
      "Cartes avec effets de survol et transitions fluides",
      "Statistiques en temps réel (mouvements, paires, temps)",
      "Interface responsive avec grille adaptative",
      "Effets visuels avancés (glow, shadows, gradients)",
    ],
  },
  {
    id: 18,
    title: "Quiz de Personnalité Interactif",
    category: "développement",
    subcategory: "petit code",
    description: "Quiz de personnalité interactif avec design coloré et animations fluides, système de résultats personnalisés et expérience utilisateur engageante",
    image: "/projects/personality-quiz.jpg",
    link: "/personality-quiz",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    details: [
      "Quiz de personnalité complet avec 6 questions",
      "4 types de personnalités : Créatif, Analytique, Aventurier, Social",
      "Système de calcul de résultats basé sur les réponses",
      "Design coloré avec dégradés violet/purple/fuchsia",
      "Animations très fluides et 'juicy' sur tous les éléments",
      "Barre de progression animée",
      "Transitions entre questions avec effets de slide",
      "Particules animées en arrière-plan",
      "Page de résultats avec description personnalisée",
      "Badges de traits de personnalité avec animations",
      "Effets de survol et de clic très réactifs",
      "Design glassmorphism avec backdrop blur",
      "Interface responsive et moderne",
    ],
  },
  {
    id: 19,
    title: "API Request Builder",
    category: "développement",
    subcategory: "petit code",
    description: "Outil professionnel de développement pour construire, tester et exporter des requêtes API avec génération automatique de commandes cURL",
    image: "/projects/api-builder.jpg",
    link: "/api-builder",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "REST API"],
    details: [
      "Builder de requêtes API professionnel type Postman/Insomnia",
      "Support de toutes les méthodes HTTP (GET, POST, PUT, DELETE, PATCH)",
      "Gestion dynamique des headers avec ajout/suppression",
      "Éditeur de body JSON pour les requêtes POST/PUT/PATCH",
      "Simulation d'envoi de requêtes avec réponse formatée",
      "Génération automatique de commandes cURL",
      "Export des requêtes en format JSON",
      "Copie des commandes cURL en un clic",
      "Design dark mode professionnel type VS Code",
      "Interface en deux panneaux (Request/Response)",
      "Affichage formaté des réponses JSON",
      "Indicateurs visuels de statut (loading, success)",
      "Typographie monospace pour le code",
      "Design moderne et épuré pour développeurs",
    ],
  },
  {
    id: 20,
    title: "Convertisseur d'Unités Universel",
    category: "développement",
    subcategory: "petit code",
    description: "Outil de conversion d'unités complet avec 6 catégories (longueur, masse, température, temps, énergie, volume) et conversions en temps réel",
    image: "/projects/unit-converter.jpg",
    link: "/unit-converter",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    details: [
      "Convertisseur d'unités universel avec 6 catégories",
      "Longueur : mm, cm, m, km, pouces, pieds, yards, miles",
      "Masse : mg, g, kg, tonnes, onces, livres",
      "Température : Celsius, Fahrenheit, Kelvin avec formules spéciales",
      "Temps : millisecondes, secondes, minutes, heures, jours, semaines, mois, années",
      "Énergie : Joules, kilojoules, calories, kilocalories, Wh, kWh",
      "Volume : mL, L, gallons, quarts, pintes, tasses, fl oz",
      "Conversions en temps réel instantanées",
      "Gestion spéciale des conversions de température",
      "Bouton d'inversion rapide entre unités",
      "Formatage intelligent des nombres (notation scientifique si nécessaire)",
      "Design light mode moderne avec dégradés emerald/teal",
      "Interface intuitive avec sélecteurs de catégories",
      "Cartes d'information sur les fonctionnalités",
    ],
  },
  {
    id: 23,
    title: "Simulateur de Prix - Projet Digital",
    category: "développement",
    subcategory: "petit code",
    description: "Outil interactif permettant d'estimer le coût d'un projet digital en fonction du type de service, des fonctionnalités et du délai de livraison. Le prix est calculé et mis à jour en temps réel pour offrir une expérience utilisateur fluide et intuitive.",
    image: "/projects/simulator.jpg",
    link: "/simulator",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    details: [
      "Simulateur de prix interactif pour projets digitaux",
      "3 types de projets : Site vitrine (800€), E-commerce (1500€), App mobile (2500€)",
      "Sélection du nombre de pages avec slider (1-20 pages, +50€/page)",
      "Option design personnalisé avec toggle (+400€)",
      "Responsive inclus par défaut avec badge visuel",
      "5 fonctionnalités avancées configurables :",
      "  • Formulaire de contact (+150€)",
      "  • Authentification utilisateur (+300€)",
      "  • Paiement en ligne (+500€)",
      "  • Tableau de bord admin (+600€)",
      "Sélection du délai de livraison : Standard (4 sem), Rapide (2 sem, +300€), Urgent (1 sem, +600€)",
      "Calcul du prix en temps réel avec animations fluides",
      "Animation count-up du prix total avec Framer Motion",
      "Récapitulatif détaillé avec toutes les options sélectionnées",
      "Interface moderne style SaaS avec cartes cliquables",
      "Sliders stylisés avec indicateurs visuels",
      "Badge 'Populaire' sur l'option e-commerce",
      "Micro-animations sur tous les éléments interactifs",
      "Design responsive optimisé mobile/tablette/desktop",
      "Logique de calcul centralisée et typée avec TypeScript",
      "Composants modulaires et réutilisables",
      "Expérience utilisateur fluide et intuitive",
    ],
  },
  {
    id: 24,
    title: "Configurateur de Produit - Sneakers Streetwear",
    category: "développement",
    subcategory: "petit code",
    description: "Configurateur e-commerce interactif permettant de personnaliser un produit en temps réel. L'utilisateur peut choisir les couleurs, matières et options, avec un aperçu dynamique et un calcul de prix instantané pour une expérience proche d'un vrai site marchand.",
    image: "/projects/configurator.jpg",
    link: "/configurator",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "SVG"],
    details: [
      "Configurateur de produit e-commerce interactif",
      "Produit : Sneakers Streetwear avec prix de base 120€",
      "4 couleurs disponibles : Blanc, Noir, Beige, Rouge",
      "Aperçu visuel en temps réel avec SVG animé",
      "Changement de couleur dynamique avec transitions fluides",
      "Sélection de taille (38 à 46) avec boutons interactifs",
      "3 matières configurables :",
      "  • Toile standard (inclus)",
      "  • Cuir synthétique (+20€)",
      "  • Cuir premium (+40€)",
      "3 options de personnalisation :",
      "  • Logo brodé (+15€)",
      "  • Texte personnalisé (+20€)",
      "  • Semelle renforcée (+25€)",
      "2 types de packaging : Standard (inclus) ou Premium (+15€)",
      "Calcul du prix en temps réel avec animation count-up",
      "Récapitulatif détaillé avec toutes les options sélectionnées",
      "Bouton 'Ajouter au panier' avec animation",
      "Design moderne style e-commerce avec couleurs variées",
      "Pastilles de couleur interactives avec feedback visuel",
      "Micro-animations sur tous les éléments (hover, click, transitions)",
      "SVG personnalisé du produit avec détails animés",
      "Badge matériau affiché sur l'aperçu",
      "Interface responsive optimisée mobile/tablette/desktop",
      "Logique de calcul centralisée et typée avec TypeScript",
      "Composants modulaires et réutilisables",
      "Expérience utilisateur immersive et engageante",
    ],
  },
  {
    id: 26,
    title: "Générateur de Nom de Marque",
    category: "développement",
    subcategory: "petit code",
    description: "Application interactive permettant de générer des noms de marque stylés à partir de mots-clés et de styles prédéfinis. Conçue pour offrir une expérience fluide, moderne et instantanée sans backend.",
    image: "/projects/brand-generator.jpg",
    link: "/brand-name-generator",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    details: [
      "Générateur de noms de marque interactif et créatif",
      "5 styles de marque disponibles :",
      "  • Tech (💻) - Noms modernes pour startups tech",
      "  • Luxe (💎) - Noms élégants et prestigieux",
      "  • Streetwear (🧢) - Noms percutants et urbains",
      "  • Minimal (✨) - Noms épurés et simples",
      "  • Nature (🌿) - Noms écologiques et naturels",
      "Génération de 8-10 noms uniques par style",
      "Système de génération intelligent avec :",
      "  • Préfixes et suffixes selon le style",
      "  • Transformations typographiques",
      "  • Variations aléatoires",
      "Champ de saisie pour mot-clé avec validation",
      "Sélection de style avec cartes interactives colorées",
      "Génération instantanée au clic ou avec Enter",
      "Affichage des résultats en grille responsive",
      "Copie en un clic avec feedback visuel ('Copié !')",
      "Bouton 'Régénérer' pour nouvelles suggestions",
      "Animation staggered des cartes de résultats",
      "Design unique avec gradients purple/pink/orange",
      "Arrière-plan animé avec cercles flous colorés",
      "Cartes de style avec couleurs dynamiques",
      "Effets hover et transitions fluides",
      "Typographie large et moderne pour les noms",
      "Interface responsive optimisée mobile/tablette/desktop",
      "Logique de génération centralisée et typée",
      "Composants modulaires et réutilisables",
      "Expérience utilisateur fluide et engageante",
    ],
  },
  {
    id: 27,
    title: "URBANA Studio - Identité Visuelle",
    category: "graphisme",
    subcategory: "branding",
    description: "Création d'une identité visuelle complète pour une marque streetwear fictive. Le projet inclut le logo, la palette de couleurs, les typographies, le moodboard et des mockups, avec une approche axée sur la cohérence graphique et la direction artistique.",
    image: "/projects/urbana-branding.jpg",
    link: "/portfolio/urbana-branding",
    technologies: ["Branding", "Identité Visuelle", "Logo Design", "Direction Artistique", "Mockups"],
    details: [
      "Création d'identité visuelle complète pour URBANA Studio",
      "Marque streetwear moderne et unisexe",
      "Positionnement : haut de gamme accessible",
      "Cible : 18-35 ans, urbains, sensibles au design",
      "Valeurs : authenticité, simplicité, créativité, modernité",
      "Logo typographique minimal et impactant",
      "Variantes : logo principal, monochrome, icône favicon",
      "Adaptation web et print",
      "Palette de couleurs limitée (5 couleurs) :",
      "  • Noir Urbain (#0A0A0A) - Texte principal",
      "  • Blanc Pur (#FFFFFF) - Fonds et contrastes",
      "  • Orange Énergie (#FF6B35) - Accents et CTA",
      "  • Gris Ciment (#8E8E93) - Textes secondaires",
      "  • Beige Urbain (#F5F5F0) - Fonds alternatifs",
      "Typographie principale : Inter",
      "Typographie secondaire : Space Grotesk",
      "Justification des choix typographiques",
      "Moodboard avec 6 inspirations visuelles :",
      "  • Architecture urbaine",
      "  • Street style",
      "  • Minimalisme",
      "  • Couleurs vibrantes",
      "  • Typographie bold",
      "  • Textures",
      "6 mockups d'application :",
      "  • Homepage web",
      "  • Post Instagram",
      "  • Affiche print",
      "  • T-shirt",
      "  • Packaging",
      "  • Application mobile",
      "Cohérence graphique sur tous les supports",
      "Direction artistique claire et définie",
      "Présentation professionnelle dans portfolio",
      "Design épuré avec fond clair/beige",
      "Animations légères et scroll fluide",
      "Composants interactifs (swatches de couleurs, galerie)",
      "Interface responsive optimisée",
    ],
  },
  {
    id: 28,
    title: "LUMINAÊ - Identité Visuelle",
    category: "graphisme",
    subcategory: "branding",
    description: "Création d'une identité visuelle complète pour un centre de bien-être fictif. Le projet met l'accent sur une direction artistique douce et premium à travers le logo, la palette de couleurs, les typographies, le moodboard et les supports de communication.",
    image: "/projects/luminae-branding.jpg",
    link: "/portfolio/luminae-branding",
    technologies: ["Branding", "Identité Visuelle", "Logo Design", "Direction Artistique", "Mockups"],
    details: [
      "Création d'identité visuelle complète pour LUMINAÊ",
      "Centre de bien-être & soins holistiques",
      "Positionnement : haut de gamme, naturel, apaisant, intemporel",
      "Cible : 25-50 ans, actifs urbains, sensibles au bien-être",
      "Valeurs : sérénité, équilibre, authenticité, élégance",
      "Logo typographique élégant avec accent circonflexe",
      "Inspiration nature et lumière",
      "Variantes : logo principal, simplifié, monochrome, favicon",
      "Palette de couleurs douce et naturelle (5 couleurs) :",
      "  • Beige Lumière (#F5F1EB) - Fonds principaux",
      "  • Vert Sauge (#9CAF88) - Accents naturels",
      "  • Ivoire Doux (#FAF8F3) - Fonds alternatifs",
      "  • Brun Chaleureux (#8B7355) - Textes principaux",
      "  • Doré Subtil (#D4AF37) - Accents premium",
      "Typographie principale : Playfair Display (serif élégante)",
      "Typographie secondaire : Inter (sans-serif légère)",
      "Justification des choix typographiques",
      "Moodboard avec 6 inspirations visuelles :",
      "  • Textures naturelles (lin, pierre, bois)",
      "  • Lumière douce et apaisante",
      "  • Silhouettes calmes (yoga, méditation)",
      "  • Espaces épurés et zen",
      "  • Palette douce naturelle",
      "  • Détails premium",
      "4 mockups d'application :",
      "  • Page d'accueil du site",
      "  • Carte de visite premium",
      "  • Post Instagram",
      "  • Affiche bien-être",
      "Direction artistique douce et premium",
      "Design épuré avec beaucoup d'espace blanc",
      "Animations lentes et douces",
      "Typographie respirante",
      "Scroll fluide et apaisant",
      "Aucune surcharge visuelle",
      "Polyvalence graphique démontrée",
      "Contraste avec projet streetwear (URBANA)",
      "Présentation professionnelle dans portfolio",
      "Composants interactifs élégants",
      "Interface responsive optimisée",
    ],
  },
  {
    id: 29,
    title: "Landing Page Marketing - Flowly",
    category: "développement",
    subcategory: "web",
    description: "Landing page orientée conversion conçue pour un produit digital fictif. Le projet met en avant une structure marketing efficace, un copywriting clair et une expérience utilisateur optimisée pour guider l'utilisateur vers l'action.",
    image: "/projects/flowly-landing.jpg",
    link: "/landing-flowly",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Marketing", "UX"],
    details: [
      "Landing page marketing orientée conversion",
      "Produit fictif : Flowly - Application de gestion de projets pour freelances",
      "Cible : Freelances, créateurs de contenu, indépendants, startups",
      "Structure marketing optimisée pour la conversion",
      "Hero Section avec titre orienté bénéfice",
      "Sous-titre explicatif clair",
      "CTA principal bien visible",
      "Mockup produit visuel",
      "Proposition de valeur avec 3 bénéfices clés :",
      "  • Gagnez du temps chaque jour",
      "  • Une vue claire sur vos priorités",
      "  • Travaillez plus sereinement",
      "4 fonctionnalités présentées sous forme de cards :",
      "  • Gestion des tâches intelligente",
      "  • Vue calendrier",
      "  • Rappels automatiques",
      "  • Organisation par projet",
      "Chaque feature reliée à un bénéfice utilisateur",
      "Preuve sociale complète :",
      "  • 3 témoignages utilisateurs avec notes",
      "  • 4 statistiques impactantes",
      "  • Logos clients fictifs",
      "Section 'Comment ça marche' en 3 étapes :",
      "  • Créez un compte",
      "  • Ajoutez vos projets",
      "  • Travaillez plus efficacement",
      "CTA final avec rappel des bénéfices",
      "Design SaaS moderne et professionnel",
      "Couleurs sobres avec accents bleu/purple",
      "Sections bien aérées et respirantes",
      "Boutons visibles et contrastés",
      "Responsive mobile-first",
      "Scroll fluide avec animations",
      "Hiérarchie de l'information claire",
      "CTA répétés intelligemment",
      "Animations légères (fade, slide)",
      "Copywriting orienté bénéfices",
      "Structure marketing efficace",
      "Optimisation UX pour la conversion",
      "Compréhensible en moins de 5 secondes",
      "Composants modulaires et réutilisables",
      "Interface responsive optimisée",
      "Parcours utilisateur complet et interactif",
      "Modal d'inscription au clic sur CTA",
      "Onboarding en 3 étapes personnalisé :",
      "  • Étape 1 : Choix de l'objectif principal",
      "  • Étape 2 : Type d'utilisateur",
      "  • Étape 3 : Préférences (rappels, mode sombre, vue)",
      "Redirection vers dashboard fictif personnalisé",
      "Page /demo avec fonctionnalités interactives :",
      "  • Dashboard avec stats simulées",
      "  • Liste de projets avec filtres",
      "  • Marquer tâches comme terminées (visuel)",
      "  • Animations de progression",
      "  • Personnalisation selon onboarding",
      "Sticky header avec CTA qui change au scroll",
      "Indicateurs de confiance animés",
      "Message d'urgence fictif",
      "Toast de feedback utilisateur",
      "Compréhension du parcours utilisateur",
      "Sens du produit SaaS",
      "Maîtrise UX + marketing",
      "Création d'interaction crédible",
      "Données en mémoire (sessionStorage)",
      "Aucun backend requis",
    ],
  },
  {
    id: 30,
    title: "Campagne 360° - Silence",
    category: "communication",
    description: "Projet fictif de sensibilisation sur la surcharge numérique chez les jeunes adultes. Cette campagne met l'accent sur le message, l'émotion et l'impact visuel à travers une landing page, une expérience interactive symbolique et des déclinaisons print et réseaux sociaux.",
    image: "/projects/silence-campaign.jpg",
    link: "/portfolio/silence-campaign",
    technologies: ["Communication", "Stratégie", "Direction Artistique", "Storytelling", "Design Graphique"],
    details: [
      "Campagne de communication 360° - Silence",
      "Thématique : Santé mentale & surcharge numérique chez les jeunes (18-30 ans)",
      "Objectifs de communication :",
      "  • Sensibiliser à la fatigue mentale causée par le digital",
      "  • Créer une prise de conscience émotionnelle",
      "  • Inciter à une action simple : faire une pause",
      "  • Faire passer un message, pas vendre un produit",
      "Cible : Jeunes adultes 18-30 ans, étudiants, jeunes actifs très connectés",
      "Big Idea : 'Le bruit numérique est invisible, mais il fatigue.'",
      "Concept créatif basé sur le contraste :",
      "  • Trop de contenu",
      "  • Trop de notifications",
      "  • Trop de sollicitations",
      "  • → Besoin de silence",
      "Direction artistique :",
      "  • Palette : noir, blanc, gris, rouge (accent)",
      "  • Typographie : sans-serif moderne, texte serré",
      "  • Visuels : écrans surchargés, notifications empilées",
      "  • Animations : accumulation → arrêt brutal → silence",
      "Ton & message : Direct, minimaliste, impactant, émotionnel",
      "Slogans créés :",
      "  • 'Trop de bruit. Pas assez de silence.'",
      "  • 'Ton téléphone ne se repose jamais. Et toi ?'",
      "  • 'Déconnecter, c'est aussi prendre soin de soi.'",
      "Landing page éditoriale de sensibilisation :",
      "  • Hero avec slogan fort",
      "  • Texte court de sensibilisation",
      "  • Chiffres clés (87% submergés, 4h30/jour, 72% fatigue)",
      "  • Call To Action : 'Faire une pause de 60 secondes'",
      "Expérience interactive symbolique :",
      "  • Écran devient noir au clic",
      "  • Compte à rebours de 60 secondes",
      "  • Message final : 'Le silence fait aussi partie de ta journée.'",
      "  • Action symbolique, très communication",
      "Déclinaison réseaux sociaux :",
      "  • 6 posts Instagram (Feed + Stories)",
      "  • Formats variés : texte plein écran, notifications, écran vide",
      "  • Messages percutants et visuels impactants",
      "Affiche print A3 :",
      "  • Message fort et visuel minimaliste",
      "  • QR code renvoyant à la landing page",
      "Bilan de communication :",
      "  • Problématique définie",
      "  • Objectifs clairs",
      "  • Cible identifiée",
      "  • Message clé développé",
      "  • Choix graphiques justifiés",
      "  • Impact attendu expliqué",
      "Compétences démontrées :",
      "  • Conception de message",
      "  • Storytelling",
      "  • Direction artistique",
      "  • Sens du public cible",
      "  • Déclinaison multi-supports",
      "  • Communication responsable",
      "Design épuré noir et blanc",
      "Animations subtiles et impactantes",
      "Interface responsive",
    ],
  },
  {
    id: 31,
    title: "OFFLINE SUNDAY - Campagne Lifestyle",
    category: "communication",
    description: "Projet fictif de brand content visant à revaloriser le temps lent et les rituels du dimanche chez les jeunes adultes urbains. La campagne repose sur un concept éditorial, une direction artistique chaleureuse et des déclinaisons digitales et print.",
    image: "/projects/offline-sunday.jpg",
    link: "/portfolio/offline-sunday",
    technologies: ["Communication", "Brand Content", "Direction Artistique", "Storytelling", "Lifestyle"],
    details: [
      "Campagne de communication lifestyle - OFFLINE SUNDAY",
      "Domaine : Lifestyle / Slow life / Culture urbaine",
      "Problématique : Les jeunes actifs vivent à 100 à l'heure, même le week-end",
      "Question : Comment revaloriser le temps lent sans être moralisateur ?",
      "Objectifs de communication :",
      "  • Créer une tendance",
      "  • Installer un concept de marque",
      "  • Donner envie d'adopter un rituel",
      "  • Créer de l'adhésion, pas vendre",
      "Cible : 20-35 ans, urbains, créatifs, freelances, étudiants",
      "Sensibles à l'esthétique & au lifestyle",
      "Big Idea : 'Le dimanche n'est pas fait pour performer.'",
      "Concept : Créer un rendez-vous symbolique - le dimanche OFFLINE",
      "Direction artistique lifestyle :",
      "  • Palette : beige, crème, brun, vert sauge",
      "  • Style : Minimal, chaleureux, editorial",
      "  • Typographies : Serif élégante (Playfair Display) + Sans-serif moderne (Inter)",
      "  • Visuels : Lumière naturelle, cafés, livres, balade, carnet, soleil",
      "  • Aucun écran visible",
      "Ton & message : Doux, inspirant, non-injonctif",
      "Exemples de messages :",
      "  • 'Aujourd'hui, on ne prévoit rien.'",
      "  • 'Dimanche, on ralentit.'",
      "  • 'Moins faire. Mieux être.'",
      "Mini-site éditorial type magazine :",
      "  • Manifeste OFFLINE SUNDAY",
      "  • Citation inspirante animée",
      "  • Playlist fictive",
      "  • Rituel du dimanche (3 idées : café, lecture, balade)",
      "  • CTA : 'Adopter le OFFLINE SUNDAY'",
      "Expérience interactive douce et poétique :",
      "  • Animation fade avec grain texture",
      "  • Message : 'Pose ton téléphone. Respire.'",
      "  • Compte à rebours symbolique de 30 secondes",
      "  • Message final : 'Moins faire. Mieux être.'",
      "  • Bouton 'Continuer à scroller' (clin d'œil)",
      "  • Interaction poétique, pas fonctionnelle",
      "Brand content réseaux sociaux :",
      "  • 6 posts Instagram (Feed + Stories)",
      "  • Format lifestyle avec messages doux",
      "  • Exemples : 'No plans. Just vibes.', 'This Sunday is offline', 'Slow is the new cool'",
      "Affiche print minimaliste :",
      "  • Format urbain avec message simple",
      "  • Logo OFFLINE SUNDAY",
      "  • Aucun call to action agressif",
      "Brand guidelines légères :",
      "  • Logo",
      "  • Couleurs (4 couleurs : beige, crème, brun, vert sauge)",
      "  • Typographies (Playfair Display + Inter)",
      "  • Moodboard lifestyle",
      "  • Règles de ton",
      "Compétences démontrées :",
      "  • Création de concept",
      "  • Storytelling lifestyle",
      "  • Branding émotionnel",
      "  • Direction artistique",
      "  • Brand content",
      "  • Culture de marque",
      "Design chaleureux et premium",
      "Esthétique lifestyle minimaliste",
      "Animations douces et subtiles",
      "Interface responsive",
    ],
  },
  {
    id: 32,
    title: "Lumière sur l'Art - Campagne Interactive",
    category: "communication",
    description: "Projet fictif de communication pour un festival d'art contemporain. Cette campagne met l'accent sur le storytelling visuel, les interactions immersives et la déclinaison multi-supports (landing page, mini-explorateur d'œuvres, réseaux sociaux et print), créant un univers cohérent et émotionnel pour le public cible.",
    image: "/projects/lumiere-art.jpg",
    link: "/portfolio/lumiere-art",
    technologies: ["Communication", "Direction Artistique", "Storytelling", "Design Interactif", "Brand Content"],
    details: [
      "Campagne de communication interactive - Lumière sur l'Art",
      "Domaine : Culture / événement / valorisation artistique",
      "Festival d'art contemporain fictif",
      "Objectifs de communication :",
      "  • Promouvoir un festival d'art contemporain",
      "  • Attirer le public jeune et adulte curieux",
      "  • Créer un univers graphique fort et reconnaissable",
      "  • Expérience utilisateur interactive pour renforcer le message",
      "Cible : 18-45 ans, amateurs d'art, urbains, sensibles à l'esthétique",
      "Big Idea : 'Chaque œuvre a sa lumière, chaque visiteur son moment'",
      "Univers lumineux, poétique et immersif",
      "Contraste clair/obscur et couleurs vives pour chaque œuvre",
      "Transmission d'émotion plutôt que simple information",
      "Direction artistique :",
      "  • Palette : noir profond, blanc lumineux, couleurs vives ponctuelles",
      "  • Typographies : Serif élégant (Playfair Display) + Sans-serif moderne (Inter)",
      "  • Visuels : Illustrations stylisées, lumières/néons/ombres",
      "  • Animations : fade in, hover effects, scroll parallaxe",
      "Landing page événementielle interactive :",
      "  • Hero animé avec slogan, date et CTA",
      "  • Animation d'apparition des lettres",
      "  • Background lumineux progressif",
      "  • Programme du festival filtrable par type d'œuvre",
      "  • Survol interactif avec zoom et description",
      "Mini-explorateur d'œuvres interactif :",
      "  • Grille d'œuvres avec hover/click",
      "  • Modal popup au clic avec :",
      "    - Zoom sur l'image",
      "    - Description complète",
      "    - Citation inspirante de l'artiste",
      "  • Filtres par type (peinture, sculpture, installation)",
      "  • Rendu très immersif côté communication",
      "Artistes vedettes :",
      "  • Carousel interactif",
      "  • Tooltip sur chaque artiste avec mini-biographie",
      "  • Navigation fluide",
      "Preuve sociale fictive :",
      "  • Avis de visiteurs avec notes",
      "  • Nombre de participants estimé (+2 500)",
      "Brand content réseaux sociaux :",
      "  • 6 posts Instagram (Carousels + Stories)",
      "  • Visuels lifestyle et artistiques",
      "  • CTA fictif vers landing page",
      "  • Interactions : swipe simulé, hover animés",
      "Print :",
      "  • Affiche A3 avec message principal, date, QR code",
      "  • Flyer A5 avec informations essentielles",
      "  • Mockups photo réalistes",
      "Moodboard & Guidelines :",
      "  • Palette de couleurs (5 couleurs)",
      "  • Typographies principales et secondaires",
      "  • Iconographie / style des illustrations",
      "  • Règles de mise en page pour print et digital",
      "Fonctionnalités interactives :",
      "  • Scroll parallaxe (background/foreground)",
      "  • Animation des titres et sections au scroll",
      "  • Hover sur images : zoom + glow",
      "  • Sticky navigation avec CTA répété",
      "Compétences démontrées :",
      "  • Concept créatif et storytelling",
      "  • Direction artistique & univers graphique",
      "  • Déclinaison multi-supports (web + print + réseaux)",
      "  • Interaction immersive et expérience utilisateur",
      "  • Cohérence graphique et message fort",
      "Design lumineux et immersif",
      "Animations subtiles et impactantes",
      "Interface responsive",
    ],
  },
  {
    id: 33,
    title: "Visual Soundscape - Animation Interactive",
    category: "audiovisuel",
    description: "Expérience audiovisuelle interactive générée entièrement par code. Les formes, couleurs et animations réagissent au mouvement de la souris, au scroll et aux clics, simulant un paysage sonore visuel. Ce projet démontre la maîtrise de Canvas, WebGL, React et TypeScript, ainsi que la capacité à créer de l'audiovisuel numérique immersif 100 % codé.",
    image: "/projects/visual-soundscape.jpg",
    link: "/visual-soundscape",
    technologies: ["Canvas API", "React", "TypeScript", "Framer Motion", "WebGL", "Mathématiques génératives"],
    details: [
      "Expérience audiovisuelle interactive générée par code",
      "Animation générative avec particules et formes géométriques",
      "Réactivité au mouvement de la souris :",
      "  • Influence sur la position et la vitesse des particules",
      "  • Dégradé radial centré sur la position de la souris",
      "  • Effet de force magnétique sur les particules",
      "Réactivité au scroll :",
      "  • Influence sur la direction des particules",
      "  • Variation dynamique de l'intensité",
      "Réactivité aux clics :",
      "  • Effet de vague (ripple) depuis le point de clic",
      "  • Propagation d'ondes visuelles",
      "Simulation d'ondes sonores visuelles :",
      "  • Double système d'ondes sinusoïdales",
      "  • Animations fluides et synchronisées",
      "  • Effet de pulsation et de rythme",
      "Système de particules avancé :",
      "  • 200+ particules animées en temps réel",
      "  • Connexions entre particules proches",
      "  • Cycle de vie avec fade in/out",
      "  • Couleurs dynamiques selon les réglages",
      "Formes géométriques rotatives :",
      "  • Cercles concentriques animés",
      "  • Rotation synchronisée avec le temps",
      "  • Variation de taille dynamique",
      "Palette de réglages en temps réel :",
      "  • Couleur principale et secondaire (color picker)",
      "  • Vitesse d'animation (0.1x à 3x)",
      "  • Taille des particules (1px à 10px)",
      "  • Densité des particules (10% à 100%)",
      "  • Rotation des formes géométriques (0° à 360°)",
      "Contrôles interactifs :",
      "  • Bouton Play/Pause pour lancer/arrêter l'animation",
      "  • Bouton Reset pour réinitialiser l'animation",
      "  • Mode plein écran pour expérience immersive",
      "  • Panneau de réglages masquable",
      "Animations fluides et bouclées :",
      "  • 60 FPS avec requestAnimationFrame",
      "  • Transitions douces entre les états",
      "  • Pas de saccades ni de lag",
      "Design immersif :",
      "  • Fond dégradé sombre (gray-900, purple-900)",
      "  • Interface avec backdrop blur",
      "  • Bordures et ombres subtiles",
      "  • Typographie avec gradients colorés",
      "Technologies utilisées :",
      "  • Canvas API pour le rendu 2D",
      "  • React Hooks pour la gestion d'état",
      "  • TypeScript pour la sécurité de type",
      "  • Framer Motion pour les animations UI",
      "  • Mathématiques génératives pour les effets",
      "Compétences démontrées :",
      "  • Génération audiovisuelle par code",
      "  • Maîtrise Canvas / WebGL / React",
      "  • Interaction temps réel / UX audiovisuelle",
      "  • Créativité pure dans un format 100% codé",
      "  • Expérience immersive sans matériel audiovisuel réel",
      "Interface responsive et accessible",
      "Performance optimisée pour tous les navigateurs",
    ],
  },
];

const categories: ProjectCategory[] = [
  "développement",
  "graphisme",
  "communication",
  "webtv et loisirs",
  "audiovisuel",
];

// Fonction helper pour obtenir les classes de couleur selon la catégorie (et sous-catégorie dev)
const getCategoryColors = (category: ProjectCategory, subcategory?: ProjectSubcategory) => {
  // Sous-catégories développement : couleurs distinctes
  if (category === "développement" && subcategory === "site internet") {
    return {
      gradient: "gradient-site-internet",
      bg: "from-siteInternet-900 to-siteInternet-800",
      badge: "bg-siteInternet-900/80 text-siteInternet-200",
      border: "border-siteInternet-600",
      hover: "hover:border-siteInternet-600 hover:text-siteInternet-400",
      active: "bg-siteInternet-800/50 text-white border-siteInternet-600",
      button: "bg-gradient-site-internet text-white shadow-lg shadow-siteInternet-900/50",
      tag: "bg-siteInternet-900/30 border-siteInternet-800 text-siteInternet-300",
      text: "text-siteInternet-400",
      modalHeader: "from-siteInternet-900 to-siteInternet-800",
      modalBadge: "bg-siteInternet-900/80 text-siteInternet-200",
      modalTitle: "text-siteInternet-400",
      modalTag: "bg-siteInternet-900/30 border-siteInternet-800 text-siteInternet-300",
      modalButton: "bg-gradient-site-internet text-white shadow-lg shadow-siteInternet-900/50",
    };
  }
  if (category === "développement" && subcategory === "petit code") {
    return {
      gradient: "gradient-petit-code",
      bg: "from-petitCode-900 to-petitCode-800",
      badge: "bg-petitCode-900/80 text-petitCode-200",
      border: "border-petitCode-600",
      hover: "hover:border-petitCode-600 hover:text-petitCode-400",
      active: "bg-petitCode-800/50 text-white border-petitCode-600",
      button: "bg-gradient-petit-code text-white shadow-lg shadow-petitCode-900/50",
      tag: "bg-petitCode-900/30 border-petitCode-800 text-petitCode-300",
      text: "text-petitCode-400",
      modalHeader: "from-petitCode-900 to-petitCode-800",
      modalBadge: "bg-petitCode-900/80 text-petitCode-200",
      modalTitle: "text-petitCode-400",
      modalTag: "bg-petitCode-900/30 border-petitCode-800 text-petitCode-300",
      modalButton: "bg-gradient-petit-code text-white shadow-lg shadow-petitCode-900/50",
    };
  }
  switch (category) {
    case "développement":
      return {
        gradient: "gradient-dev",
        bg: "from-dev-900 to-dev-800",
        badge: "bg-dev-900/80 text-dev-200",
        border: "border-dev-600",
        hover: "hover:border-dev-600 hover:text-dev-400",
        active: "bg-dev-800/50 text-white border-dev-600",
        button: "bg-gradient-dev text-white shadow-lg shadow-dev-900/50",
        tag: "bg-dev-900/30 border-dev-800 text-dev-300",
        text: "text-dev-400",
        modalHeader: "from-dev-900 to-dev-800",
        modalBadge: "bg-dev-900/80 text-dev-200",
        modalTitle: "text-dev-400",
        modalTag: "bg-dev-900/30 border-dev-800 text-dev-300",
        modalButton: "bg-gradient-dev text-white shadow-lg shadow-dev-900/50",
      };
    case "graphisme":
      return {
        gradient: "gradient-graphisme",
        bg: "from-graphisme-900 to-graphisme-800",
        badge: "bg-graphisme-900/80 text-graphisme-200",
        border: "border-graphisme-600",
        hover: "hover:border-graphisme-600 hover:text-graphisme-400",
        active: "bg-graphisme-800/50 text-white border-graphisme-600",
        button: "bg-gradient-graphisme text-white shadow-lg shadow-graphisme-900/50",
        tag: "bg-graphisme-900/30 border-graphisme-800 text-graphisme-300",
        text: "text-graphisme-400",
        modalHeader: "from-graphisme-900 to-graphisme-800",
        modalBadge: "bg-graphisme-900/80 text-graphisme-200",
        modalTitle: "text-graphisme-400",
        modalTag: "bg-graphisme-900/30 border-graphisme-800 text-graphisme-300",
        modalButton: "bg-gradient-graphisme text-white shadow-lg shadow-graphisme-900/50",
      };
    case "communication":
      return {
        gradient: "gradient-communication",
        bg: "from-communication-900 to-communication-800",
        badge: "bg-communication-900/80 text-communication-200",
        border: "border-communication-600",
        hover: "hover:border-communication-600 hover:text-communication-400",
        active: "bg-communication-800/50 text-white border-communication-600",
        button: "bg-gradient-communication text-white shadow-lg shadow-communication-900/50",
        tag: "bg-communication-900/30 border-communication-800 text-communication-300",
        text: "text-communication-400",
        modalHeader: "from-communication-900 to-communication-800",
        modalBadge: "bg-communication-900/80 text-communication-200",
        modalTitle: "text-communication-400",
        modalTag: "bg-communication-900/30 border-communication-800 text-communication-300",
        modalButton: "bg-gradient-communication text-white shadow-lg shadow-communication-900/50",
      };
    case "webtv et loisirs":
      return {
        gradient: "gradient-webtv",
        bg: "from-webtv-900 to-webtv-800",
        badge: "bg-webtv-900/80 text-webtv-200",
        border: "border-webtv-600",
        hover: "hover:border-webtv-600 hover:text-webtv-400",
        active: "bg-webtv-800/50 text-white border-webtv-600",
        button: "bg-gradient-webtv text-white shadow-lg shadow-webtv-900/50",
        tag: "bg-webtv-900/30 border-webtv-800 text-webtv-300",
        text: "text-webtv-400",
        modalHeader: "from-webtv-900 to-webtv-800",
        modalBadge: "bg-webtv-900/80 text-webtv-200",
        modalTitle: "text-webtv-400",
        modalTag: "bg-webtv-900/30 border-webtv-800 text-webtv-300",
        modalButton: "bg-gradient-webtv text-white shadow-lg shadow-webtv-900/50",
      };
    case "audiovisuel":
      return {
        gradient: "gradient-audiovisuel",
        bg: "from-audiovisuel-900 to-audiovisuel-800",
        badge: "bg-audiovisuel-900/80 text-audiovisuel-200",
        border: "border-audiovisuel-600",
        hover: "hover:border-audiovisuel-600 hover:text-audiovisuel-400",
        active: "bg-audiovisuel-800/50 text-white border-audiovisuel-600",
        button: "bg-gradient-audiovisuel text-white shadow-lg shadow-audiovisuel-900/50",
        tag: "bg-audiovisuel-900/30 border-audiovisuel-800 text-audiovisuel-300",
        text: "text-audiovisuel-400",
        modalHeader: "from-audiovisuel-900 to-audiovisuel-800",
        modalBadge: "bg-audiovisuel-900/80 text-audiovisuel-200",
        modalTitle: "text-audiovisuel-400",
        modalTag: "bg-audiovisuel-900/30 border-audiovisuel-800 text-audiovisuel-300",
        modalButton: "bg-gradient-audiovisuel text-white shadow-lg shadow-audiovisuel-900/50",
      };
    default:
      return {
        gradient: "gradient-bordeaux",
        bg: "from-bordeaux-900 to-bordeaux-800",
        badge: "bg-bordeaux-900/80 text-bordeaux-200",
        border: "border-bordeaux-600",
        hover: "hover:border-bordeaux-600 hover:text-bordeaux-400",
        active: "bg-bordeaux-800/50 text-white border-bordeaux-600",
        button: "bg-gradient-bordeaux text-white shadow-lg shadow-bordeaux-900/50",
        tag: "bg-bordeaux-900/30 border-bordeaux-800 text-bordeaux-300",
        text: "text-bordeaux-400",
        modalHeader: "from-bordeaux-900 to-bordeaux-800",
        modalBadge: "bg-bordeaux-900/80 text-bordeaux-200",
        modalTitle: "text-bordeaux-400",
        modalTag: "bg-bordeaux-900/30 border-bordeaux-800 text-bordeaux-300",
        modalButton: "bg-gradient-bordeaux text-white shadow-lg shadow-bordeaux-900/50",
      };
  }
};

// Composant pour générer une image de preview avec gradient
const ProjectPreviewImage = ({ category, subcategory, title, className }: { category: ProjectCategory; subcategory?: ProjectSubcategory; title: string; className?: string }) => {
  const colors = getCategoryColors(category, subcategory);
  const getIcon = () => {
    switch (category) {
      case "développement":
        return <Code size={64} className="text-white/30" />;
      case "graphisme":
        return <Palette size={64} className="text-white/30" />;
      case "communication":
        return <MessageSquare size={64} className="text-white/30" />;
      case "webtv et loisirs":
        return <Video size={64} className="text-white/30" />;
      case "audiovisuel":
        return <Camera size={64} className="text-white/30" />;
      default:
        return <Code size={64} className="text-white/30" />;
    }
  };

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} flex items-center justify-center ${className || ''}`}>
      <div className="flex flex-col items-center justify-center gap-4">
        {getIcon()}
        <div className="text-white/20 text-sm font-semibold text-center px-4 line-clamp-2">
          {title}
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("développement");
  const [selectedSubcategory, setSelectedSubcategory] = useState<DevSubcategory | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Images manquantes (404) : on affiche le fallback gradient au lieu de casser
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "50px 0px",
  });
  // Fallback : sur mobile, l'IntersectionObserver peut ne pas se déclencher (barre d’URL, scroll)
  const [fallbackVisible, setFallbackVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFallbackVisible(true), 800);
    return () => clearTimeout(t);
  }, []);
  const sectionVisible = inView || fallbackVisible;

  const filteredProjects = projects.filter((p) => {
    if (p.category !== selectedCategory) return false;
    if (selectedCategory === "développement" && selectedSubcategory !== "all") {
      return p.subcategory === selectedSubcategory;
    }
    return true;
  }).sort((a, b) => {
    // Mettre les projets featured en premier
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const devProjects = projects.filter((p) => p.category === "développement");
  const siteInternetProjects = devProjects.filter((p) => p.subcategory === "site internet");
  const petitCodeProjects = devProjects.filter((p) => p.subcategory === "petit code");

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-bordeaux mx-auto rounded-full mb-8" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => {
            const colors = getCategoryColors(category);
            return (
              <motion.button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  if (category === "développement") {
                    setSelectedSubcategory("all");
                  }
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? colors.button
                    : `glass text-gray-300 ${colors.hover}`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Subcategory Filter for Development */}
        {selectedCategory === "développement" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {(() => {
              const colorsAll = getCategoryColors("développement");
              const colorsSite = getCategoryColors("développement", "site internet");
              const colorsPetit = getCategoryColors("développement", "petit code");
              return (
                <>
                  <motion.button
                    onClick={() => setSelectedSubcategory("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSubcategory === "all"
                        ? colorsAll.active
                        : `glass text-gray-300 ${colorsAll.hover}`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tous
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedSubcategory("site internet")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSubcategory === "site internet"
                        ? colorsSite.active
                        : `glass text-gray-300 ${colorsSite.hover}`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Site internet
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedSubcategory("petit code")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSubcategory === "petit code"
                        ? colorsPetit.active
                        : `glass text-gray-300 ${colorsPetit.hover}`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Petit code
                  </motion.button>
                </>
              );
            })()}
          </motion.div>
        )}

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => {
              const colors = getCategoryColors(project.category, project.subcategory);
              const isFeatured = project.featured;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass rounded-2xl overflow-hidden ${colors.hover} transition-all group cursor-pointer ${
                    isFeatured
                      ? "md:col-span-2 lg:col-span-3 border-2 border-yellow-500/60 shadow-2xl shadow-yellow-900/40 ring-2 ring-yellow-500/20"
                      : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -5, scale: isFeatured ? 1.01 : 1.02 }}
                >
                  <div className={`relative ${isFeatured ? "h-64" : "h-48"} bg-gradient-to-br ${colors.bg} overflow-hidden`}>
                    {/* Image de preview (fallback gradient si fichier absent / 404) */}
                    {project.image && !imageErrors[project.id] ? (
                      <div className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                          onError={() => setImageErrors((prev) => ({ ...prev, [project.id]: true }))}
                        />
                      </div>
                    ) : (
                      <ProjectPreviewImage category={project.category} subcategory={project.subcategory} title={project.title} />
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                      {isFeatured && (
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white backdrop-blur-sm rounded-full text-xs font-bold shadow-lg shadow-orange-500/50"
                        >
                          ⭐ Projet mis en avant
                        </motion.span>
                      )}
                      <span className={`px-3 py-1 ${colors.badge} backdrop-blur-sm rounded-full text-xs capitalize`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 ${colors.tag} border rounded text-xs`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={`px-2 py-1 ${colors.tag} border rounded text-xs`}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm text-gray-400 group-hover:${colors.text} transition-colors`}>
                        Voir les détails →
                      </span>
                      {project.link && (
                        project.link.startsWith("/") ? (
                          <Link
                            href={project.link}
                            onClick={(e) => e.stopPropagation()}
                            className={`${colors.text} hover:opacity-80`}
                          >
                            <ExternalLink size={18} />
                          </Link>
                        ) : (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`${colors.text} hover:opacity-80`}
                          >
                            <ExternalLink size={18} />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (() => {
          const colors = getCategoryColors(selectedProject.category, selectedProject.subcategory);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-strong rounded-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`relative h-64 bg-gradient-to-br ${colors.modalHeader} overflow-hidden`}>
                  {/* Image de preview dans la modal (fallback gradient si 404) */}
                  {selectedProject.image && !imageErrors[selectedProject.id] ? (
                    <div className="absolute inset-0">
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        unoptimized
                        onError={() => setImageErrors((prev) => ({ ...prev, [selectedProject.id]: true }))}
                      />
                    </div>
                  ) : (
                    <ProjectPreviewImage category={selectedProject.category} subcategory={selectedProject.subcategory} title={selectedProject.title} className="h-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <span className={`px-3 py-1 ${colors.modalBadge} backdrop-blur-sm rounded-full text-xs md:text-sm capitalize`}>
                      {selectedProject.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
                  >
                    ×
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-gray-300 mb-6 text-base md:text-lg">
                    {selectedProject.description}
                  </p>
                  <div className="mb-6">
                    <h4 className={`text-lg md:text-xl font-bold ${colors.modalTitle} mb-3`}>
                      Détails du projet
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.details.map((detail, i) => (
                        <li
                          key={i}
                          className="text-gray-300 flex items-start gap-2 text-sm md:text-base"
                        >
                          <span className={`${colors.text} mt-1`}>•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h4 className={`text-lg md:text-xl font-bold ${colors.modalTitle} mb-3`}>
                      Technologies utilisées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 ${colors.modalTag} border rounded-full text-xs md:text-sm`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.link && (
                      selectedProject.link.startsWith("/") ? (
                        <Link
                          href={selectedProject.link}
                          className={`flex items-center gap-2 px-6 py-3 ${colors.modalButton} rounded-lg font-semibold hover:shadow-lg transition-all`}
                          onClick={() => setSelectedProject(null)}
                        >
                          <ExternalLink size={18} />
                          <span>Voir le projet</span>
                        </Link>
                      ) : (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 ${colors.modalButton} rounded-lg font-semibold hover:shadow-lg transition-all`}
                        >
                          <ExternalLink size={18} />
                          <span>Voir le projet</span>
                        </a>
                      )
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-6 py-3 glass rounded-lg font-semibold text-white ${colors.hover} transition-all`}
                      >
                        <Github size={18} />
                        <span>Code source</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}

