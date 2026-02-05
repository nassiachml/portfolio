"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  RotateCcw, 
  Trophy, 
  Zap, 
  Clock,
  Sparkles,
  Star
} from "lucide-react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🎮", "🎯", "🎨", "🎭", "🎪", "🎬", "🎸", "🎹", "🎺", "🎻", "🥁", "🎤"];

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [showParticles, setShowParticles] = useState(false);

  const getCardCount = () => {
    switch (difficulty) {
      case "easy": return 8;
      case "medium": return 12;
      case "hard": return 16;
    }
  };

  const initializeGame = useCallback(() => {
    const cardCount = getCardCount();
    const selectedEmojis = emojis.slice(0, cardCount / 2);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    
    // Shuffle
    const shuffled = cardPairs
      .map((emoji, index) => ({ emoji, sort: Math.random(), id: index }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({
        id: index,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setTime(0);
    setIsPlaying(true);
    setShowParticles(false);
  }, [difficulty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched ||
      gameWon
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      
      setTimeout(() => {
        const [firstIndex, secondIndex] = newFlipped;
        const firstCard = newCards[firstIndex];
        const secondCard = newCards[secondIndex];

        if (firstCard.emoji === secondCard.emoji) {
          // Match!
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          setMatches((prev) => prev + 1);
          setShowParticles(true);
          setTimeout(() => setShowParticles(false), 1000);
        } else {
          // No match
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
        }

        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    const totalPairs = getCardCount() / 2;
    if (matches === totalPairs && matches > 0) {
      setGameWon(true);
      setIsPlaying(false);
    }
  }, [matches, difficulty]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{
                x: `${randomX}%`,
                y: `${randomY}%`,
              }}
              animate={{
                y: `${(randomY + Math.random() * 20) % 100}%`,
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Particles Effect */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  scale: [0, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.02,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Memory Game
            </h1>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-pink-400" />
            </motion.div>
          </div>
          <p className="text-gray-400 text-lg">Testez votre mémoire !</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard icon={<Zap />} label="Mouvements" value={moves} color="cyan" />
          <StatCard icon={<Trophy />} label="Paires" value={`${matches}/${getCardCount() / 2}`} color="yellow" />
          <StatCard icon={<Clock />} label="Temps" value={formatTime(time)} color="purple" />
          <StatCard icon={<Star />} label="Difficulté" value={difficulty} color="pink" />
        </motion.div>

        {/* Difficulty Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 mb-8"
        >
          {(["easy", "medium", "hard"] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficulty(level);
                setTimeout(initializeGame, 100);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize ${
                difficulty === level
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {level}
            </button>
          ))}
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8"
          style={{
            gridTemplateColumns: `repeat(${Math.sqrt(getCardCount())}, minmax(0, 1fr))`,
          }}
        >
          {cards.map((card, index) => (
            <CardComponent
              key={card.id}
              card={card}
              index={index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          <motion.button
            onClick={initializeGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Nouvelle partie
          </motion.button>
          <Link
            href="/#portfolio"
            className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-all"
          >
            ← Retour
          </Link>
        </motion.div>

        {/* Win Modal */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center border-2 border-cyan-400 shadow-2xl shadow-cyan-500/50 max-w-md mx-4"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Trophy className="w-16 h-16 text-yellow-400" />
                </motion.div>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
                  Félicitations !
                </h2>
                <p className="text-gray-300 mb-6">
                  Vous avez terminé le jeu en {moves} mouvements et {formatTime(time)} !
                </p>
                <motion.button
                  onClick={initializeGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Rejouer
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: "cyan" | "yellow" | "purple" | "pink";
}) {
  const colorClasses = {
    cyan: "from-cyan-500 to-cyan-600",
    yellow: "from-yellow-500 to-yellow-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
    >
      <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center text-white mb-2`}>
        {icon}
      </div>
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className="text-white text-xl font-bold">{value}</div>
    </motion.div>
  );
}

function CardComponent({ card, index, onClick }: {
  card: Card;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="aspect-square cursor-pointer perspective-1000"
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-cyan-500/50 flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
        </div>

        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <motion.div
            className={`w-full h-full rounded-xl border-2 flex items-center justify-center text-4xl shadow-lg ${
              card.isMatched
                ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-400"
                : "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-400"
            }`}
            animate={card.isMatched ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {card.emoji}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

