"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  ArrowUp, 
  ArrowDown,
  BarChart3,
  PieChart,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";

interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    conversionRate: number;
    growth: number;
  };
  monthlyData: Array<{
    month: string;
    users: number;
    revenue: number;
    sessions: number;
  }>;
  trafficSources: Array<{
    source: string;
    value: number;
    color: string;
  }>;
  topPages: Array<{
    page: string;
    views: number;
    bounceRate: number;
  }>;
  deviceTypes: Array<{
    device: string;
    percentage: number;
    color: string;
  }>;
  realtimeActivity: Array<{
    time: string;
    users: number;
  }>;
}

export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({
    users: 0,
    revenue: 0,
    conversion: 0,
  });

  useEffect(() => {
    fetch("/analytics-data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        
        // Animate numbers
        animateValue("users", 0, data.overview.totalUsers, 2000);
        animateValue("revenue", 0, data.overview.revenue, 2000);
        animateValue("conversion", 0, data.overview.conversionRate, 2000);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const animateValue = (key: "users" | "revenue" | "conversion", start: number, end: number, duration: number) => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * easeOutCubic(progress);
      
      setAnimatedValues((prev) => ({
        ...prev,
        [key]: current,
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const maxUsers = data ? Math.max(...data.monthlyData.map(d => d.users)) : 0;
  const maxRevenue = data ? Math.max(...data.monthlyData.map(d => d.revenue)) : 0;

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-indigo-600 text-xl">Chargement du dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <Link
            href="/#portfolio"
            className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            ← Retour
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="Utilisateurs totaux"
            value={Math.round(animatedValues.users).toLocaleString()}
            change={data.overview.growth}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={<Activity className="w-6 h-6" />}
            title="Utilisateurs actifs"
            value={data.overview.activeUsers.toLocaleString()}
            change={5.2}
            color="from-green-500 to-green-600"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6" />}
            title="Revenus"
            value={`€${Math.round(animatedValues.revenue).toLocaleString()}`}
            change={12.8}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Taux de conversion"
            value={`${animatedValues.conversion.toFixed(1)}%`}
            change={-2.1}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart - Users */}
          <ChartCard title="Évolution des utilisateurs">
            <div className="h-64 flex items-end justify-between gap-2">
              {data.monthlyData.map((item, index) => (
                <motion.div
                  key={item.month}
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.users / maxUsers) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg relative group"
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {item.users.toLocaleString()}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
                    {item.month}
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>

          {/* Line Chart - Revenue */}
          <ChartCard title="Évolution des revenus">
            <div className="h-64 flex items-end justify-between gap-2">
              {data.monthlyData.map((item, index) => (
                <motion.div
                  key={item.month}
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative group"
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    €{item.revenue.toLocaleString()}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
                    {item.month}
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Sources - Pie Chart */}
          <ChartCard title="Sources de trafic">
            <div className="space-y-4">
              {data.trafficSources.map((source, index) => (
                <motion.div
                  key={source.source}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{source.source}</span>
                      <span className="text-sm font-semibold text-gray-900">{source.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${source.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>

          {/* Device Types */}
          <ChartCard title="Types d'appareils">
            <div className="space-y-4">
              {data.deviceTypes.map((device, index) => {
                const Icon = device.device === "Mobile" ? Smartphone : device.device === "Desktop" ? Monitor : Tablet;
                return (
                  <motion.div
                    key={device.device}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${device.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: device.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">{device.device}</span>
                        <span className="font-bold text-gray-900">{device.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${device.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          className="h-2 rounded-full"
                          style={{ backgroundColor: device.color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ChartCard>

          {/* Top Pages */}
          <ChartCard title="Pages les plus visitées">
            <div className="space-y-3">
              {data.topPages.map((page, index) => (
                <motion.div
                  key={page.page}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{page.page}</div>
                    <div className="text-xs text-gray-500">{page.views.toLocaleString()} vues</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{page.bounceRate}%</div>
                    <div className="text-xs text-gray-500">Bounce</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, color }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: number;
  color: string;
}) {
  const isPositive = change > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        <span>{Math.abs(change)}%</span>
        <span className="text-gray-500">vs mois dernier</span>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      {children}
    </motion.div>
  );
}

