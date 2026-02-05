"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, Bell } from "lucide-react";
import StatCard from "@/components/demo/StatCard";
import ProjectList from "@/components/demo/ProjectList";

interface OnboardingData {
  goal: string | null;
  userType: string | null;
  reminders: boolean;
  darkMode: boolean;
  viewPreference: "list" | "kanban";
}

const userTypeLabels: Record<string, string> = {
  freelance: "Freelance",
  creator: "Créateur de contenu",
  team: "Petite équipe",
};

const goalLabels: Record<string, string> = {
  projects: "Gérer mes projets",
  time: "Mieux organiser mon temps",
  stress: "Réduire ma charge mentale",
};

export default function DemoPage() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("flowlyOnboarding");
    if (data) {
      setOnboardingData(JSON.parse(data));
    } else {
      // Default data if no onboarding
      setOnboardingData({
        goal: "projects",
        userType: "freelance",
        reminders: true,
        darkMode: false,
        viewPreference: "list",
      });
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const userTypeLabel = onboardingData?.userType
    ? userTypeLabels[onboardingData.userType] || "Utilisateur"
    : "Utilisateur";

  return (
    <div className={`min-h-screen ${onboardingData?.darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <header className={`${onboardingData?.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/landing-flowly")}
              className={`flex items-center gap-2 ${onboardingData?.darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Retour</span>
            </button>
            <div className="flex items-center gap-4">
              <button className={`p-2 rounded-lg ${onboardingData?.darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                <Bell size={20} />
              </button>
              <button className={`p-2 rounded-lg ${onboardingData?.darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 rounded-xl ${onboardingData?.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}
        >
          <h1 className={`text-3xl font-black mb-2 ${onboardingData?.darkMode ? "text-white" : "text-gray-900"}`}>
            Bienvenue {userTypeLabel} 👋
          </h1>
          <p className={`${onboardingData?.darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {onboardingData?.goal && `Votre objectif : ${goalLabels[onboardingData.goal] || onboardingData.goal}`}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Projets actifs"
            value={3}
            icon="📋"
            color="from-blue-500 to-blue-600"
            index={0}
            darkMode={onboardingData?.darkMode}
          />
          <StatCard
            label="Tâches du jour"
            value={12}
            icon="✅"
            color="from-purple-500 to-purple-600"
            index={1}
            darkMode={onboardingData?.darkMode}
          />
          <StatCard
            label="Taux de complétion"
            value="62%"
            icon="📈"
            color="from-pink-500 to-pink-600"
            index={2}
            darkMode={onboardingData?.darkMode}
          />
        </div>

        {/* Projects */}
        <div className={`rounded-xl p-6 ${onboardingData?.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}>
          <h2 className={`text-2xl font-bold mb-6 ${onboardingData?.darkMode ? "text-white" : "text-gray-900"}`}>
            Mes projets
          </h2>
          <ProjectList
            viewPreference={onboardingData?.viewPreference || "list"}
            darkMode={onboardingData?.darkMode || false}
          />
        </div>

        {/* Preferences indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <p className="text-sm text-blue-700 text-center">
            <strong>Préférences appliquées :</strong>{" "}
            {onboardingData?.reminders && "🔔 Rappels activés • "}
            {onboardingData?.darkMode && "🌙 Mode sombre • "}
            Vue {onboardingData?.viewPreference === "kanban" ? "Kanban" : "Liste"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
