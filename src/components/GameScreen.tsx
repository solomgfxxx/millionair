import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Divide } from 'lucide-react';
import { GameState } from '../types';

interface GameScreenProps {
  gameState: GameState;
  onAnswer: (answer: string) => void;
  onUseLifeline: (lifeline: 'phoneAFriend' | 'fiftyFifty') => void;
  onQuit: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  onAnswer,
  onUseLifeline,
  onQuit,
}) => {
  const currentQuestion = gameState.questions[gameState.currentQuestion];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">جاري تحميل السؤال...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{gameState.playerName}</h2>
            <p className="text-purple-300">الجائزة الحالية: {gameState.currentPrize} جنيه</p>
          </div>
          <div className="text-white text-xl">
            الوقت المتبقي: {gameState.timeLeft} ثانية
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl border border-purple-500/30"
        >
          <h3 className="text-2xl text-white mb-6 text-center">
            {currentQuestion.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer(option)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
              >
                {String.fromCharCode(65 + index)}. {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onUseLifeline('phoneAFriend')}
              disabled={gameState.usedLifelines.phoneAFriend}
              className={`p-4 rounded-full ${
                gameState.usedLifelines.phoneAFriend
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              <Phone className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onUseLifeline('fiftyFifty')}
              disabled={gameState.usedLifelines.fiftyFifty}
              className={`p-4 rounded-full ${
                gameState.usedLifelines.fiftyFifty
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              <Divide className="w-6 h-6 text-white" />
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuit}
            className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-xl text-lg font-semibold"
          >
            انسحاب
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameScreen;