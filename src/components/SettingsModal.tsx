import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  difficulty: string;
  onChangeDifficulty: (difficulty: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  difficulty,
  onChangeDifficulty,
}) => {
  const difficulties = ['سهل', 'متوسط', 'صعب', 'الكل'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">الإعدادات</h2>

            <div className="space-y-4">
              <h3 className="text-lg text-purple-200">مستوى الصعوبة</h3>
              <div className="grid grid-cols-2 gap-3">
                {difficulties.map(diff => (
                  <motion.button
                    key={diff}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onChangeDifficulty(diff)}
                    className={`py-2 px-4 rounded-lg text-white font-semibold transition-all duration-300 ${
                      difficulty === diff
                        ? 'bg-purple-500 shadow-lg shadow-purple-500/25'
                        : 'bg-purple-900/50 hover:bg-purple-800/50'
                    }`}
                  >
                    {diff}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;