"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

export default function ProfilePage() {
  const { user, getOrders } = useStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/ecommerce/login");
      return;
    }
    setOrders(getOrders().filter((o) => o.items.length > 0));
  }, [user, router, getOrders]);

  if (!user) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Package className="w-5 h-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "processing":
        return "En cours de traitement";
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

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-black mb-12 tracking-tighter">
          MON COMPTE
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-black text-white p-8 border border-gray-800">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter text-white">
                  {user.name}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-300 uppercase tracking-wider text-sm">
                    Commandes
                  </span>
                  <span className="font-black text-white">{orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 uppercase tracking-wider text-sm">
                    Total dépensé
                  </span>
                  <span className="font-black text-white">
                    {orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}€
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-black p-8">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                Mes Commandes
              </h2>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 p-6 hover:border-gray-400 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-black text-black text-lg">
                              {order.id}
                            </span>
                            <span
                              className={`px-3 py-1 rounded border-2 text-xs font-bold uppercase flex items-center gap-1 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(order.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-black">
                            {order.total.toFixed(2)}€
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-bold text-black mb-3 uppercase text-sm tracking-wider">
                          Articles commandés :
                        </h3>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-gray-700">
                                {item.name} ({item.selectedSize}, {item.selectedColor}) x{item.quantity}
                              </span>
                              <span className="font-bold text-black">
                                {(item.price * item.quantity).toFixed(2)}€
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4 uppercase tracking-wider">
                    Vous n'avez pas encore de commandes
                  </p>
                  <Link
                    href="/ecommerce/products"
                    className="inline-block px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors"
                  >
                    Découvrir la collection
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
