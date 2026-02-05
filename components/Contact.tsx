"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Send,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:nassia.chemlal@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Contact depuis le portfolio"
    )}&body=${encodeURIComponent(
      `Bonjour Nassia,\n\n${formData.message}\n\nCordialement,\n${formData.name}\n${formData.email}`
    )}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "07 66 61 13 06",
      href: "tel:+3366611306",
    },
    {
      icon: Mail,
      label: "Email",
      value: "nassia.chemlal@gmail.com",
      href: "mailto:nassia.chemlal@gmail.com",
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Troyes et alentours, Genève",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dark-surface"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Contact</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-bordeaux mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            À la recherche d'un stage de 14 semaines en développement web et
            dispositifs interactifs à partir d'avril 2026. N'hésitez pas à me
            contacter !
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass rounded-2xl p-6 hover:border-bordeaux-600 transition-all group"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform ${
                      index === 0 ? "bg-gradient-to-br from-bordeaux-600 to-pink-600" :
                      index === 1 ? "bg-gradient-to-br from-bordeaux-600 to-rose-600" :
                      index === 2 ? "bg-gradient-to-br from-bordeaux-600 to-fuchsia-600" :
                      "bg-gradient-bordeaux"
                    }`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-lg font-semibold text-white hover:text-bordeaux-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-white">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/nassia-chemlal"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-4 glass rounded-2xl p-6 hover:border-bordeaux-600 transition-all group"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="p-3 bg-gradient-to-br from-bordeaux-600 to-rose-600 rounded-lg group-hover:scale-110 transition-transform">
                <Linkedin className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Réseau social</p>
                <p className="text-lg font-semibold text-white group-hover:text-bordeaux-400 transition-colors">
                  LinkedIn
                </p>
              </div>
            </motion.a>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bordeaux-600 transition-colors"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bordeaux-600 transition-colors"
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bordeaux-600 transition-colors"
                  placeholder="Sujet de votre message"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bordeaux-600 transition-colors resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-bordeaux rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-bordeaux-900/50 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                <span>Envoyer le message</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

