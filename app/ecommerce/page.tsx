"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, TrendingUp } from "lucide-react";
import { useStore } from "./context/StoreContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
}

export default function FashionHome() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useStore();

  useEffect(() => {
    fetch("/fashion-data.json")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(
          data.products.filter((p: Product) => p.featured).slice(0, 4)
        );
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Black Friday Banner */}
      <section className="bg-red-600 text-white py-2 px-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-xl md:text-2xl font-black tracking-tighter">
              BLACK FRIDAY
            </span>
            <span className="text-sm md:text-lg font-bold">
              JUSQU'À -55% SUR TOUTE LA COLLECTION
            </span>
            <span className="text-xs md:text-sm bg-white text-red-600 px-3 py-0.5 font-bold uppercase">
              OFFRE LIMITÉE
            </span>
          </div>
        </motion.div>
      </section>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop)",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white mb-4 sm:mb-6 tracking-tighter">
            URBAN
            <br />
            <span className="text-pink-500">EDGE</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 font-light tracking-wider uppercase">
            Street Style. Your Way.
          </p>
          <Link
            href="/ecommerce/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
          >
            Découvrir la collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-black mb-2 tracking-tighter">
                NOUVEAUTÉS
              </h2>
              <p className="text-gray-600 uppercase tracking-wider text-sm">
                Les dernières pièces de la collection
              </p>
            </div>
            <Link
              href="/ecommerce/products"
              className="hidden md:flex items-center gap-2 text-black hover:text-pink-500 transition-colors font-medium uppercase tracking-wider text-sm"
            >
              Tout voir
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/ecommerce/products/${product.id}`}>
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-black uppercase">
                        BLACK FRIDAY
                        <br />
                        -{Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}%
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1 uppercase tracking-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          {product.originalPrice}€
                        </span>
                      )}
                      <span className="font-bold text-red-600">
                        {product.price}€
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                NOTRE
                <br />
                <span className="text-pink-500">PHILOSOPHIE</span>
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                URBAN EDGE incarne l'esprit de la rue, où chaque pièce raconte
                une histoire. Nous créons des vêtements <span className="text-white font-bold">100% unisexes</span> qui reflètent votre
                personnalité, votre audace et votre style unique, sans distinction de genre.
              </p>
              <p className="text-gray-300 mb-4">
                Des matières durables, des designs intemporels, une mode qui
                vous ressemble.
              </p>
              <p className="text-gray-300 text-sm italic">
                "La mode n'a pas de genre. Elle a un style, une attitude, une identité. C'est ça, URBAN EDGE."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              REJOIGNEZ
              <br />
              LE MOUVEMENT
            </h2>
            <p className="text-xl mb-8 text-pink-100">
              Découvrez notre collection complète et trouvez votre style
            </p>
            <Link
              href="/ecommerce/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors"
            >
              Voir la collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
