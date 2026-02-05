"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Warehouse,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

export default function AdminPage() {
  const { user, isAdmin, getOrders } = useStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/ecommerce/login");
      return;
    }
    setOrders(getOrders());
  }, [user, isAdmin, router, getOrders]);

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((o) => o.status === selectedStatus);

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    completedOrders: orders.filter((o) => o.status === "delivered").length,
  };

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

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-4 md:mb-0 tracking-tighter">
            ADMIN
          </h1>
          <Link
            href="/ecommerce/admin/stock"
            className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <Warehouse className="w-5 h-5" />
            Gestion du stock
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-black text-white p-6 border border-gray-800">
            <Package className="w-8 h-8 mb-4" />
            <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">
              Commandes
            </p>
            <p className="text-3xl font-black text-white">{stats.totalOrders}</p>
          </div>
          <div className="bg-pink-500 text-white p-6 border border-pink-600">
            <DollarSign className="w-8 h-8 mb-4" />
            <p className="text-pink-50 text-sm uppercase tracking-wider mb-1">
              Chiffre d'affaires
            </p>
            <p className="text-3xl font-black text-white">{stats.totalRevenue.toFixed(2)}€</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 border border-yellow-600">
            <Clock className="w-8 h-8 mb-4" />
            <p className="text-yellow-50 text-sm uppercase tracking-wider mb-1">
              En attente
            </p>
            <p className="text-3xl font-black text-white">{stats.pendingOrders}</p>
          </div>
          <div className="bg-green-500 text-white p-6 border border-green-600">
            <CheckCircle className="w-8 h-8 mb-4" />
            <p className="text-green-50 text-sm uppercase tracking-wider mb-1">
              Livrées
            </p>
            <p className="text-3xl font-black text-white">{stats.completedOrders}</p>
          </div>
        </div>

        <div className="bg-white border-2 border-black p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-black mb-4 md:mb-0 uppercase tracking-tighter">
              Commandes
            </h2>
            <div className="flex flex-wrap gap-2">
              {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 font-bold uppercase text-sm transition-colors ${
                      selectedStatus === status
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    {status === "all"
                      ? "Toutes"
                      : status === "pending"
                      ? "En attente"
                      : status === "processing"
                      ? "En cours"
                      : status === "shipped"
                      ? "Expédiées"
                      : status === "delivered"
                      ? "Livrées"
                      : "Annulées"}
                  </button>
                )
              )}
            </div>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 p-6 hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() => router.push(`/ecommerce/admin/orders/${order.id}`)}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
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
                          {order.status === "pending"
                            ? "En attente"
                            : order.status === "processing"
                            ? "En cours"
                            : order.status === "shipped"
                            ? "Expédiée"
                            : order.status === "delivered"
                            ? "Livrée"
                            : "Annulée"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {new Date(order.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.items.length} article(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-black">
                        {order.total.toFixed(2)}€
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune commande trouvée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
