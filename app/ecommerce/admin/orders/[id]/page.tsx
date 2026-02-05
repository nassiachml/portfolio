"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "../../../context/StoreContext";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
} from "lucide-react";
import Image from "next/image";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  images: string[];
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAdmin, getOrders } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/ecommerce/login");
      return;
    }

    const orders = getOrders();
    const foundOrder = orders.find((o) => o.id === params.id);

    if (foundOrder) {
      setOrder(foundOrder);
      // Générer des données client fictives
      const fakeCustomers: Customer[] = [
        {
          name: "Sophie Martin",
          email: "sophie.martin@email.com",
          phone: "+33 6 12 34 56 78",
          address: "42 Avenue des Champs-Élysées",
          city: "Paris",
          postalCode: "75008",
          country: "France",
        },
        {
          name: "Thomas Dubois",
          email: "thomas.dubois@email.com",
          phone: "+33 6 23 45 67 89",
          address: "15 Rue de la République",
          city: "Lyon",
          postalCode: "69001",
          country: "France",
        },
        {
          name: "Emma Lefevre",
          email: "emma.lefevre@email.com",
          phone: "+33 6 34 56 78 90",
          address: "8 Boulevard Saint-Michel",
          city: "Marseille",
          postalCode: "13001",
          country: "France",
        },
        {
          name: "Lucas Bernard",
          email: "lucas.bernard@email.com",
          phone: "+33 6 45 67 89 01",
          address: "23 Place Bellecour",
          city: "Lyon",
          postalCode: "69002",
          country: "France",
        },
      ];

      // Sélectionner un client aléatoire basé sur l'ID de commande
      const customerIndex = parseInt(foundOrder.id.slice(-1)) % fakeCustomers.length;
      setCustomer(fakeCustomers[customerIndex]);
    }
  }, [params.id, user, isAdmin, router, getOrders]);

  if (!user || !isAdmin) {
    return null;
  }

  if (!order || !customer) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Commande introuvable</p>
          <button
            onClick={() => router.push("/ecommerce/admin")}
            className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors"
          >
            Retour à l'admin
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-500";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-500";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-500";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "processing":
        return "En cours";
      case "shipped":
        return "Expédiée";
      case "delivered":
        return "Livrée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push("/ecommerce/admin")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour aux commandes</span>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-black mb-2 tracking-tighter">
              Commande {order.id}
            </h1>
            <p className="text-gray-600">
              {new Date(order.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded border-2 text-sm font-bold uppercase ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Customer Info */}
          <div className="border border-gray-200 p-6">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tighter flex items-center gap-2">
              <User className="w-6 h-6" />
              Informations client
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nom complet</p>
                <p className="font-bold text-black">{customer.name}</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a
                    href={`mailto:${customer.email}`}
                    className="font-medium text-black hover:underline"
                  >
                    {customer.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                  <a
                    href={`tel:${customer.phone}`}
                    className="font-medium text-black hover:underline"
                  >
                    {customer.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Adresse de livraison</p>
                  <p className="font-medium text-black">
                    {customer.address}
                    <br />
                    {customer.postalCode} {customer.city}
                    <br />
                    {customer.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-gray-200 p-6">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tighter flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Résumé de la commande
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-bold text-black">
                  {(order.total * 0.8).toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="font-bold text-black">5.99€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">TVA (20%)</span>
                <span className="font-bold text-black">
                  {(order.total * 0.2).toFixed(2)}€
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-black text-black">Total</span>
                <span className="text-2xl font-black text-black">
                  {order.total.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border border-gray-200 p-6">
          <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tighter flex items-center gap-2">
            <Package className="w-6 h-6" />
            Articles commandés
          </h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 border border-gray-200 hover:border-gray-400 transition-colors"
              >
                <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-black mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Taille: {item.selectedSize} | Couleur: {item.selectedColor}
                  </p>
                  <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">
                    {(item.price * item.quantity).toFixed(2)}€
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.price.toFixed(2)}€ / unité
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

