import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Info, Play } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenSettings: () => void;
  onOpenInfo: () => void;
  difficulty: string;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenSettings,
  onOpenInfo,
  difficulty,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-6xl font-bold text-white mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          من سيربح المليون
        </motion.h1>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="w-64 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 px-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 group-hover:animate-pulse" />
            ابدأ اللعب
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenSettings}
            className="w-64 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-3 px-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            الإعدادات
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenInfo}
            className="w-64 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-3 px-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
          >
            <Info className="w-5 h-5" />
            معلومات
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-purple-300"
        >
          مستوى الصعوبة الحالي: {difficulty}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default MainMenu;