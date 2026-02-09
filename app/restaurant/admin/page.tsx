"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRestaurant } from "../context/RestaurantContext";
import { useToast } from "../context/ToastContext";
import { useRouter } from "next/navigation";
import {
  Package,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Link as LinkIcon,
  Download,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { BarChart, LineChart, PieChart } from "../components/Charts";

export default function AdminPage() {
  const { user, isAdmin, getOrders, getReservations, updateOrderStatus, updateReservationStatus } = useRestaurant();
  const { showToast } = useToast();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<"orders" | "reservations">("orders");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/restaurant/login");
      return;
    }
    const refreshData = () => {
      setOrders(getOrders());
      setReservations(getReservations());
    };
    refreshData();
    
    // Rafraîchir les données toutes les 5 secondes pour voir les mises à jour
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, [user, isAdmin, router, getOrders, getReservations]);

  if (!user || !isAdmin) {
    return null;
  }

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.total, 0),
    pendingOrders: orders.filter((o) => o.status === "pending" || o.status === "preparing").length,
    totalReservations: reservations.length,
    pendingReservations: reservations.filter((r) => r.status === "pending").length,
    averageOrderValue: orders.length > 0 
      ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length 
      : 0,
    completedOrders: orders.filter((o) => o.status === "completed").length,
  };

  // Calcul des revenus par jour (7 derniers jours)
  const revenueByDay = (() => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
      const dayOrders = orders.filter((o) => {
        const orderDate = new Date(o.date);
        return orderDate.toDateString() === date.toDateString() && o.status === "completed";
      });
      const revenue = dayOrders.reduce((sum, o) => sum + o.total, 0);
      days.push({ name: dateStr, value: revenue });
    }
    return days;
  })();

  // Répartition des statuts des commandes
  const orderStatusDistribution = (() => {
    const statusCounts: { [key: string]: number } = {};
    orders.forEach((order) => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  })();

  // Top 5 des plats les plus vendus
  const topDishes = (() => {
    const dishCounts: { [key: string]: number } = {};
    orders.forEach((order) => {
      order.items.forEach((item: any) => {
        dishCounts[item.name] = (dishCounts[item.name] || 0) + item.quantity;
      });
    });
    return Object.entries(dishCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  })();

  // Filtrage des commandes
  const filteredOrders = (() => {
    let filtered = [...orders];

    // Filtre par date
    if (dateFilter !== "all") {
      const now = new Date();
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);
        switch (dateFilter) {
          case "today":
            return orderDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now);
            monthAgo.setDate(monthAgo.getDate() - 30);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  })();

  // Fonction d'export CSV
  const exportToCSV = (dataType: "orders" | "reservations") => {
    const data = dataType === "orders" ? orders : reservations;
    if (data.length === 0) {
      showToast(`Aucune donnée à exporter pour les ${dataType === "orders" ? "commandes" : "réservations"}.`, "info");
      return;
    }
    
    let csvRows: string[] = [];
    
    if (dataType === "orders") {
      csvRows.push("ID,Date,Statut,Total,Type,Client,Téléphone,Articles");
      for (const order of data) {
        const items = order.items.map((item: any) => `${item.name} (x${item.quantity})`).join("; ");
        csvRows.push(
          `"${order.id}","${new Date(order.date).toLocaleDateString("fr-FR")}","${order.status}","${order.total}","${order.type}","${order.customerName}","${order.customerPhone}","${items}"`
        );
      }
    } else {
      csvRows.push("ID,Date,Heure,Statut,Personnes,Nom,Email,Téléphone,Demandes spéciales");
      for (const reservation of data) {
        csvRows.push(
          `"${reservation.id}","${new Date(reservation.date).toLocaleDateString("fr-FR")}","${reservation.time}","${reservation.status}","${reservation.guests}","${reservation.name}","${reservation.email}","${reservation.phone}","${reservation.specialRequests || ""}"`
        );
      }
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${dataType}-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`${dataType === "orders" ? "Commandes" : "Réservations"} exportées avec succès !`, "success");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-500";
      case "ready":
        return "bg-green-100 text-green-800 border-green-500";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-500";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-500";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-red-900 mb-8 sm:mb-12">Administration</h1>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/restaurant/admin/stock"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-800 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-900 transition-colors"
          >
            <Package className="w-5 h-5" />
            Gestion du Stock
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg p-6 text-white">
            <Package className="w-8 h-8 mb-4" />
            <p className="text-sm text-white/80 mb-1">Commandes totales</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-lg p-6 text-white">
            <DollarSign className="w-8 h-8 mb-4" />
            <p className="text-sm text-white/80 mb-1">Chiffre d'affaires</p>
            <p className="text-3xl font-bold">{stats.totalRevenue.toFixed(2)}€</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg shadow-lg p-6 text-white">
            <Clock className="w-8 h-8 mb-4" />
            <p className="text-sm text-white/80 mb-1">En attente</p>
            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white">
            <Calendar className="w-8 h-8 mb-4" />
            <p className="text-sm text-white/80 mb-1">Réservations</p>
            <p className="text-3xl font-bold">{stats.totalReservations}</p>
            {stats.pendingReservations > 0 && (
              <p className="text-xs text-white/80 mt-1">
                {stats.pendingReservations} en attente
              </p>
            )}
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-4" />
            <p className="text-sm text-white/80 mb-1">Panier moyen</p>
            <p className="text-3xl font-bold">{stats.averageOrderValue.toFixed(2)}€</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg shadow-lg p-6 text-white">
            <CheckCircle className="w-8 h-8 mb-4" />
            <p className="text-sm text-white/80 mb-1">Terminées</p>
            <p className="text-3xl font-bold">{stats.completedOrders}</p>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <LineChart data={revenueByDay} title="Revenus sur 7 jours" />
          <PieChart data={orderStatusDistribution} title="Répartition des statuts" />
        </div>
        {topDishes.length > 0 && (
          <div className="mb-12">
            <BarChart data={topDishes} title="Top 5 des plats les plus vendus" />
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              onClick={() => setSelectedTab("orders")}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 font-bold uppercase tracking-wider rounded-lg transition-colors text-sm sm:text-base ${
                selectedTab === "orders"
                  ? "bg-red-800 text-white"
                  : "bg-white text-red-800 border-2 border-red-800"
              }`}
            >
              Commandes
            </button>
            <button
              onClick={() => setSelectedTab("reservations")}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 font-bold uppercase tracking-wider rounded-lg transition-colors text-sm sm:text-base ${
                selectedTab === "reservations"
                  ? "bg-red-800 text-white"
                  : "bg-white text-red-800 border-2 border-red-800"
              }`}
            >
              Réservations
            </button>
          </div>
          
          {/* Filtres et Export */}
          {selectedTab === "orders" && (
            <>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:ml-auto">
                <div className="flex flex-wrap items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value as any)}
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none text-gray-900 text-sm sm:text-base"
                  >
                    <option value="all">Toutes les dates</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="week">7 derniers jours</option>
                    <option value="month">30 derniers jours</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none text-gray-900 text-sm sm:text-base"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="preparing">En préparation</option>
                    <option value="ready">Prête</option>
                    <option value="completed">Terminée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </div>
                <button
                  onClick={() => exportToCSV("orders")}
                  className="px-4 py-2 bg-green-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </>
          )}
          {selectedTab === "reservations" && (
            <button
              onClick={() => exportToCSV("reservations")}
              className="px-4 py-2 bg-green-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 sm:ml-auto text-sm sm:text-base"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>

        {/* Orders */}
        {selectedTab === "orders" && (
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-red-100">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Commandes</h2>
            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 rounded-lg p-6 hover:border-red-300 transition-colors cursor-pointer"
                    onClick={() => router.push(`/restaurant/admin/orders/${order.id}`)}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            href={`/restaurant/admin/orders/${order.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-bold text-gray-900 hover:text-red-800 transition-colors"
                          >
                            {order.id}
                          </Link>
                          <span
                            className={`px-3 py-1 rounded border text-xs font-bold uppercase ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status === "pending"
                              ? "En attente"
                              : order.status === "preparing"
                              ? "En préparation"
                              : order.status === "ready"
                              ? "Prête"
                              : order.status === "completed"
                              ? "Terminée"
                              : "Annulée"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {new Date(order.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.items.length} article(s) - {order.type === "pickup" ? "À emporter" : "Sur place"}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.customerName} - {order.customerPhone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-800 mb-2">
                          {order.total.toFixed(2)}€
                        </p>
                        <div className="flex gap-2">
                          {order.status === "pending" && (
                            <button
                              onClick={() => {
                                updateOrderStatus(order.id, "preparing");
                                setOrders(getOrders());
                                showToast(`Commande ${order.id} en préparation`, "info");
                              }}
                              className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase rounded hover:bg-blue-700"
                            >
                              Préparer
                            </button>
                          )}
                          {order.status === "preparing" && (
                            <button
                              onClick={() => {
                                updateOrderStatus(order.id, "ready");
                                setOrders(getOrders());
                                showToast(`Commande ${order.id} prête`, "success");
                              }}
                              className="px-3 py-1 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-700"
                            >
                              Prête
                            </button>
                          )}
                          {order.status === "ready" && (
                            <button
                              onClick={() => {
                                updateOrderStatus(order.id, "completed");
                                setOrders(getOrders());
                                showToast(`Commande ${order.id} terminée`, "success");
                              }}
                              className="px-3 py-1 bg-gray-600 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
                            >
                              Terminer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">
                {orders.length === 0 ? "Aucune commande" : "Aucune commande ne correspond aux filtres"}
              </p>
            )}
          </div>
        )}

        {/* Reservations */}
        {selectedTab === "reservations" && (
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-red-100">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Réservations</h2>
            {reservations.length > 0 ? (
              <div className="space-y-4">
                {reservations.map((reservation, index) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 rounded-lg p-6 hover:border-red-300 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-gray-900">{reservation.id}</span>
                          <span
                            className={`px-3 py-1 rounded border text-xs font-bold uppercase ${getStatusColor(
                              reservation.status
                            )}`}
                          >
                            {reservation.status === "pending"
                              ? "En attente"
                              : reservation.status === "confirmed"
                              ? "Confirmée"
                              : "Annulée"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {new Date(reservation.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          à {reservation.time}
                        </p>
                        <p className="text-sm text-gray-700">
                          {reservation.guests} personne(s) - {reservation.name}
                        </p>
                        <p className="text-sm text-gray-700">
                          {reservation.email} - {reservation.phone}
                        </p>
                        {reservation.specialRequests && (
                          <p className="text-sm text-gray-600 italic mt-2">
                            "{reservation.specialRequests}"
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <button
                              onClick={() => {
                                updateReservationStatus(reservation.id, "confirmed");
                                setReservations(getReservations());
                                showToast(`Réservation ${reservation.id} confirmée`, "success");
                              }}
                              className="px-4 py-2 bg-green-600 text-white text-sm font-bold uppercase rounded hover:bg-green-700"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
                                  updateReservationStatus(reservation.id, "cancelled");
                                  setReservations(getReservations());
                                  showToast(`Réservation ${reservation.id} annulée`, "info");
                                }
                              }}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-bold uppercase rounded hover:bg-red-700"
                            >
                              Annuler
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">Aucune réservation</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

