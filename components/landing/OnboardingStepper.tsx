"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

interface OnboardingData {
  goal: string | null;
  userType: string | null;
  reminders: boolean;
  darkMode: boolean;
  viewPreference: "list" | "kanban";
}

interface OnboardingStepperProps {
  isOpen: boolean;
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

const goals = [
  { id: "projects", label: "Gérer mes projets", icon: "📋" },
  { id: "time", label: "Mieux organiser mon temps", icon: "⏰" },
  { id: "stress", label: "Réduire ma charge mentale", icon: "🧘" },
];

const userTypes = [
  { id: "freelance", label: "Freelance", icon: "💼" },
  { id: "creator", label: "Créateur de contenu", icon: "🎨" },
  { id: "team", label: "Petite équipe", icon: "👥" },
];

export default function OnboardingStepper({ isOpen, onComplete, onClose }: OnboardingStepperProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    goal: null,
    userType: null,
    reminders: true,
    darkMode: false,
    viewPreference: "list",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canContinue = () => {
    if (step === 1) return data.goal !== null;
    if (step === 2) return data.userType !== null;
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Étape {step} sur 3
                  </span>
                  <span className="text-sm text-gray-400">
                    {Math.round((step / 3) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Goal */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                      Quel est votre objectif principal ?
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Choisissez ce qui vous motive le plus
                    </p>
                    <div className="grid gap-4">
                      {goals.map((goal) => (
                        <motion.button
                          key={goal.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setData({ ...data, goal: goal.id })}
                          className={`p-6 rounded-xl border-2 text-left transition-all ${
                            data.goal === goal.id
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{goal.icon}</span>
                            <span className="text-lg font-semibold text-gray-900">
                              {goal.label}
                            </span>
                            {data.goal === goal.id && (
                              <Check className="ml-auto text-blue-600" size={24} />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: User Type */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                      Comment vous décririez-vous ?
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Cela nous aide à personnaliser votre expérience
                    </p>
                    <div className="grid gap-4">
                      {userTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setData({ ...data, userType: type.id })}
                          className={`p-6 rounded-xl border-2 text-left transition-all ${
                            data.userType === type.id
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{type.icon}</span>
                            <span className="text-lg font-semibold text-gray-900">
                              {type.label}
                            </span>
                            {data.userType === type.id && (
                              <Check className="ml-auto text-blue-600" size={24} />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Preferences */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                      Personnalisez votre expérience
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Configurez Flowly selon vos préférences
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Activer les rappels
                          </h3>
                          <p className="text-sm text-gray-600">
                            Recevez des notifications pour vos tâches importantes
                          </p>
                        </div>
                        <button
                          onClick={() => setData({ ...data, reminders: !data.reminders })}
                          className={`relative w-14 h-8 rounded-full transition-colors ${
                            data.reminders ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <motion.div
                            animate={{ x: data.reminders ? 24 : 4 }}
                            className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Mode sombre
                          </h3>
                          <p className="text-sm text-gray-600">
                            Interface avec fond sombre
                          </p>
                        </div>
                        <button
                          onClick={() => setData({ ...data, darkMode: !data.darkMode })}
                          className={`relative w-14 h-8 rounded-full transition-colors ${
                            data.darkMode ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <motion.div
                            animate={{ x: data.darkMode ? 24 : 4 }}
                            className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                          />
                        </button>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Vue préférée
                        </h3>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setData({ ...data, viewPreference: "list" })}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                              data.viewPreference === "list"
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="text-2xl mb-2">📝</div>
                            <div className="font-semibold text-gray-900">Liste</div>
                          </button>
                          <button
                            onClick={() => setData({ ...data, viewPreference: "kanban" })}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                              data.viewPreference === "kanban"
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="text-2xl mb-2">📊</div>
                            <div className="font-semibold text-gray-900">Kanban</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Précédent
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canContinue()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
                >
                  {step === 3 ? "Terminer" : "Suivant"}
                  {step < 3 && <ArrowRight size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
