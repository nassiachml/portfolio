"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Heart, Minus, Plus, Star } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

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
  reviews?: Review[];
}

export default function ProductPage() {
  const params = useParams();
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/fashion-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        const found = data.products.find(
          (p: Product) => p.id === Number(params.id)
        );
        if (found) {
          setProduct(found);
          setSelectedSize(found.sizes[0] || "");
          setSelectedColor(found.colors[0] || "");
        } else {
          setError("Produit introuvable");
        }
      })
      .catch((err) => {
        setError("Impossible de charger le produit. Veuillez réessayer.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Produit introuvable"}</p>
          <Link
            href="/ecommerce/products"
            className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors inline-block"
          >
            Retour à la collection
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = product.reviews
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  const categoryNames: { [key: string]: string } = {
    hoodies: "Hoodies",
    pants: "Pantalons",
    tops: "Tops",
    jackets: "Vestes",
  };

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
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: "Collection", href: "/ecommerce/products" },
            {
              label: categoryNames[product.category] || product.category,
              href: `/ecommerce/products?category=${product.category}`,
            },
            { label: product.name },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative aspect-[3/4] bg-gray-100 mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-black uppercase z-10">
                  BLACK FRIDAY
                  <br />
                  -{Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}%
                </div>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-black"
                  }`}
                />
              </button>
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-black"
                        : "border-transparent hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {categoryNames[product.category] || product.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tighter">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {averageRating.toFixed(1)} ({product.reviews.length} avis)
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-xl">
                  {product.originalPrice}€
                </span>
              )}
              <span className="text-3xl font-bold text-red-600">
                {product.price}€
              </span>
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-bold uppercase tracking-wider text-black mb-3">
                Taille
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border font-bold uppercase transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-black hover:border-gray-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-bold uppercase tracking-wider text-black mb-3">
                Couleur
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border font-bold uppercase transition-colors ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-black hover:border-gray-500"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-bold uppercase tracking-wider text-black mb-3">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold text-black w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || !product.inStock}
              className={`w-full py-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                addedToCart
                  ? "bg-green-500 text-white"
                  : "bg-black text-white hover:bg-gray-900"
              } disabled:bg-gray-300 disabled:cursor-not-allowed`}
            >
              {addedToCart ? (
                "✓ Ajouté au panier"
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Ajouter au panier
                </>
              )}
            </button>

            {!product.inStock && (
              <p className="text-red-500 mt-4 text-center font-medium">
                Ce produit est actuellement épuisé
              </p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-black text-black mb-8 uppercase tracking-tighter">
              Avis Clients
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 p-6 hover:border-gray-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-black mb-1">{review.name}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
