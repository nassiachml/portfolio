"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Heart, 
  ChefHat, 
  Sparkles,
  Shield,
  Leaf
} from "lucide-react";

interface RestaurantData {
  restaurant: {
    name: string;
    tagline: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    openingHours: any;
    about: string;
  };
}

export default function AboutPage() {
  const [data, setData] = useState<RestaurantData | null>(null);

  useEffect(() => {
    fetch("/restaurant-data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];


  const values = [
    {
      icon: Leaf,
      title: "Produits Frais",
      description: "Nous sélectionnons quotidiennement les meilleurs produits pour garantir fraîcheur et qualité."
    },
    {
      icon: ChefHat,
      title: "Savoir-Faire",
      description: "Notre chef, formé au Japon, maîtrise les techniques traditionnelles de la cuisine nippone."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Chaque plat est préparé avec passion et attention aux détails pour une expérience unique."
    },
    {
      icon: Shield,
      title: "Authenticité",
      description: "Nous respectons les recettes traditionnelles tout en les adaptant subtilement aux goûts français."
    }
  ];

  const team = [
    {
      name: "Hiroshi Tanaka",
      role: "Chef Cuisinier",
      description: "Formé à Tokyo, 15 ans d'expérience",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop"
    },
    {
      name: "Yuki Nakamura",
      role: "Sushi Master",
      description: "Spécialiste des sushis et sashimis",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop"
    },
    {
      name: "Marie Dubois",
      role: "Gérante",
      description: "Votre contact privilégié pour toutes vos questions",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&h=1080&fit=crop"
            alt="Sushi"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-800/70 to-red-900/80" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            🌸 À Propos
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Découvrez l'histoire de SAKURA
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Notre Histoire */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-red-800" />
                <h2 className="text-4xl md:text-5xl font-bold text-red-900">Notre Histoire</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{data.restaurant.about}</p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Notre chef, formé au Japon, apporte son savoir-faire et sa passion pour la cuisine traditionnelle. 
                Chaque plat est préparé avec soin, en respectant les techniques ancestrales japonaises tout en 
                s'adaptant aux goûts français.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Depuis notre ouverture, nous nous efforçons de créer une expérience culinaire authentique qui 
                transporte nos clients au cœur du Japon, tout en restant accessibles et chaleureux.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=1000&fit=crop"
                alt="Restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.section>

        {/* Nos Valeurs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre passion pour la cuisine japonaise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-amber-200"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-red-800" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>


        {/* Notre Équipe */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-red-800" />
              <h2 className="text-4xl md:text-5xl font-bold text-red-900">Notre Équipe</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rencontrez les talents qui font vivre SAKURA au quotidien
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-amber-200 text-center"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-10 h-10 text-red-800" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-1">{member.name}</h3>
                <p className="text-red-800 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-amber-200 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-red-800" />
              <h2 className="text-3xl font-bold text-red-900">Contact</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-800 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">Adresse</p>
                  <p className="text-gray-600">{data.restaurant.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-800 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">Téléphone</p>
                  <a href={`tel:${data.restaurant.phone}`} className="text-red-800 hover:text-red-900">
                    {data.restaurant.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-800 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">Email</p>
                  <a href={`mailto:${data.restaurant.email}`} className="text-red-800 hover:text-red-900">
                    {data.restaurant.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
