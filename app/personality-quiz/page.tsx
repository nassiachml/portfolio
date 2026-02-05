"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Brain, 
  Zap, 
  Star,
  Trophy,
  CheckCircle2,
  Wand2
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    personality: "creative" | "analytical" | "adventurous" | "social";
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quelle activité vous détend le plus ?",
    options: [
      { text: "Lire un bon livre", personality: "analytical" },
      { text: "Créer quelque chose de nouveau", personality: "creative" },
      { text: "Faire du sport ou une activité physique", personality: "adventurous" },
      { text: "Passer du temps avec des amis", personality: "social" },
    ],
  },
  {
    id: 2,
    question: "Comment préférez-vous résoudre un problème ?",
    options: [
      { text: "Analyser toutes les données disponibles", personality: "analytical" },
      { text: "Penser à des solutions innovantes", personality: "creative" },
      { text: "Essayer différentes approches rapidement", personality: "adventurous" },
      { text: "Demander l'avis des autres", personality: "social" },
    ],
  },
  {
    id: 3,
    question: "Votre weekend idéal serait :",
    options: [
      { text: "Apprendre quelque chose de nouveau", personality: "analytical" },
      { text: "Créer un projet artistique", personality: "creative" },
      { text: "Partir à l'aventure quelque part", personality: "adventurous" },
      { text: "Organiser une soirée avec des proches", personality: "social" },
    ],
  },
  {
    id: 4,
    question: "Quel type de film préférez-vous ?",
    options: [
      { text: "Documentaire ou thriller psychologique", personality: "analytical" },
      { text: "Film d'art ou science-fiction créative", personality: "creative" },
      { text: "Action ou aventure", personality: "adventurous" },
      { text: "Comédie ou drame relationnel", personality: "social" },
    ],
  },
  {
    id: 5,
    question: "Dans un groupe, vous êtes plutôt :",
    options: [
      { text: "Celui qui pose les bonnes questions", personality: "analytical" },
      { text: "Celui qui propose des idées originales", personality: "creative" },
      { text: "Celui qui prend des initiatives", personality: "adventurous" },
      { text: "Celui qui facilite la communication", personality: "social" },
    ],
  },
  {
    id: 6,
    question: "Quand vous travaillez sur un projet, vous préférez :",
    options: [
      { text: "Suivre un plan détaillé étape par étape", personality: "analytical" },
      { text: "Laisser libre cours à votre imagination", personality: "creative" },
      { text: "Improviser et vous adapter au fur et à mesure", personality: "adventurous" },
      { text: "Collaborer et échanger avec une équipe", personality: "social" },
    ],
  },
];

const personalityResults = {
  creative: {
    title: "Le Créatif 🎨",
    emoji: "🎨",
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-500/20 to-rose-600/20",
    description: "Vous êtes une personne créative et imaginative ! Vous voyez le monde différemment et avez un talent pour transformer les idées en réalité. Votre esprit artistique et votre capacité à penser hors des sentiers battus font de vous quelqu'un d'unique.",
    traits: ["Imaginatif", "Artistique", "Innovant", "Expressif"],
  },
  analytical: {
    title: "L'Analytique 🧠",
    emoji: "🧠",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-500/20 to-indigo-600/20",
    description: "Vous êtes une personne analytique et réfléchie ! Vous aimez comprendre le monde qui vous entoure et prendre des décisions basées sur la logique et les données. Votre esprit critique est votre force.",
    traits: ["Logique", "Réfléchi", "Méthodique", "Curieux"],
  },
  adventurous: {
    title: "L'Aventurier ⚡",
    emoji: "⚡",
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-500/20 to-red-600/20",
    description: "Vous êtes une personne aventureuse et énergique ! Vous aimez l'action, les défis et vivre de nouvelles expériences. Votre soif d'aventure et votre courage vous mènent vers des horizons excitants.",
    traits: ["Courageux", "Énergique", "Spontané", "Déterminé"],
  },
  social: {
    title: "Le Social 🌟",
    emoji: "🌟",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-500/20 to-pink-600/20",
    description: "Vous êtes une personne sociale et empathique ! Vous excellez dans les relations humaines et apportez de la joie autour de vous. Votre capacité à connecter les gens est votre super-pouvoir.",
    traits: ["Empathique", "Chaleureux", "Communicatif", "Inspirant"],
  },
};

export default function PersonalityQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<keyof typeof personalityResults | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (personality: string, optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      const newAnswers = [...answers, personality];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResult(newAnswers);
      }
    }, 600);
  };

  const calculateResult = (allAnswers: string[]) => {
    const counts = {
      creative: 0,
      analytical: 0,
      adventurous: 0,
      social: 0,
    };

    allAnswers.forEach((answer) => {
      counts[answer as keyof typeof counts]++;
    });

    const maxCount = Math.max(...Object.values(counts));
    const personality = Object.keys(counts).find(
      (key) => counts[key as keyof typeof counts] === maxCount
    ) as keyof typeof personalityResults;

    setTimeout(() => {
      setResult(personality);
      setShowResult(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowResult(false);
    setSelectedOption(null);
    setShowConfetti(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              backgroundColor: ["#f0abfc", "#a78bfa", "#c084fc", "#e879f9", "#fbbf24"][i % 5],
            }}
            animate={{
              x: [null, `${Math.random() * 100}%`],
              y: [null, `${Math.random() * 100}%`],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: ["#f0abfc", "#a78bfa", "#c084fc", "#e879f9", "#fbbf24"][i % 5],
            }}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0,
            }}
            animate={{
              y: [null, `${(Math.random() * 100) % 100}%`],
              x: [null, `${(Math.random() * 100) % 100}%`],
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ["#fbbf24", "#f472b6", "#a78bfa", "#60a5fa", "#34d399"][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: "-10px",
                }}
                initial={{ y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: "110vh",
                  rotate: 360,
                  x: (Math.random() - 0.5) * 200,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Wand2 className="w-10 h-10 text-yellow-300" />
            </motion.div>
            <motion.div
              animate={{ 
                rotate: [0, -360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.5, repeat: Infinity, delay: 0.5 }
              }}
            >
              <Sparkles className="w-12 h-12 text-pink-300" />
            </motion.div>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 3.5, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, delay: 1 }
              }}
            >
              <Star className="w-10 h-10 text-purple-300" />
            </motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl md:text-8xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent animate-gradient">
              Quiz de Personnalité
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-purple-200 text-xl md:text-2xl font-medium"
          >
            Découvrez qui vous êtes vraiment ! ✨
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border-2 border-white/30 shadow-2xl relative overflow-hidden"
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-30 -z-10"
                style={{
                  background: "linear-gradient(45deg, #fbbf24, #f472b6, #a78bfa, #60a5fa, #fbbf24)",
                  backgroundSize: "400% 400%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Enhanced Progress Bar */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <motion.span
                    key={currentQuestion}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-purple-200 font-bold text-lg"
                  >
                    Question {currentQuestion + 1} / {questions.length}
                  </motion.span>
                  <motion.span
                    key={progress}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-yellow-300 font-bold text-xl"
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>
                <div className="w-full h-5 bg-white/20 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 via-purple-400 to-cyan-400 rounded-full relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="mb-10"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-10 text-center leading-tight"
                >
                  {questions[currentQuestion].question}
                </motion.h2>

                {/* Enhanced Options */}
                <div className="space-y-5">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option.personality, index)}
                      disabled={selectedOption !== null}
                      whileHover={{ 
                        scale: selectedOption === null ? 1.03 : 1,
                        x: selectedOption === null ? 15 : 0,
                        boxShadow: selectedOption === null ? "0 20px 40px rgba(251, 191, 36, 0.3)" : "none"
                      }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, x: -30, rotateX: -15 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        rotateX: 0,
                        scale: selectedOption === index ? 1.05 : 1
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300
                      }}
                      className={`w-full p-6 md:p-8 rounded-2xl text-left font-bold text-lg md:text-xl transition-all relative overflow-hidden group ${
                        selectedOption === index
                          ? "bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white shadow-2xl shadow-yellow-400/50"
                          : "bg-white/20 text-white hover:bg-white/30 border-2 border-white/30 hover:border-yellow-400/50 backdrop-blur-sm"
                      }`}
                    >
                      {/* Shine effect */}
                      {selectedOption === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                      
                      <div className="flex items-center justify-between relative z-10">
                        <span className="flex-1">{option.text}</span>
                        {selectedOption === index && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            className="ml-4"
                          >
                            <CheckCircle2 className="w-7 h-7" />
                          </motion.div>
                        )}
                        {selectedOption === null && (
                          <motion.div
                            className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-6 h-6" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border-2 border-white/30 shadow-2xl text-center relative overflow-hidden"
            >
              {result && (
                <>
                  {/* Background gradient for result */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${personalityResults[result].bgColor} opacity-50`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="text-9xl mb-8"
                    >
                      {personalityResults[result].emoji}
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className={`text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r ${personalityResults[result].color} bg-clip-text text-transparent`}
                    >
                      {personalityResults[result].title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl md:text-2xl text-purple-100 mb-10 leading-relaxed max-w-3xl mx-auto"
                    >
                      {personalityResults[result].description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap justify-center gap-4 mb-10"
                    >
                      {personalityResults[result].traits.map((trait, index) => (
                        <motion.div
                          key={trait}
                          initial={{ scale: 0, rotate: -180, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ 
                            delay: 0.6 + index * 0.15, 
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`px-8 py-4 bg-gradient-to-r ${personalityResults[result].color} rounded-full text-white font-bold text-lg shadow-2xl`}
                        >
                          {trait}
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex gap-4 justify-center flex-wrap"
                    >
                      <motion.button
                        onClick={resetQuiz}
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full text-white font-black text-xl shadow-2xl hover:shadow-yellow-400/50 transition-all flex items-center gap-3"
                      >
                        <ArrowRight className="w-6 h-6" />
                        Refaire le quiz
                      </motion.button>
                      <Link
                        href="/#portfolio"
                        className="px-10 py-5 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-xl hover:bg-white/30 transition-all border-2 border-white/30"
                      >
                        ← Retour
                      </Link>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
