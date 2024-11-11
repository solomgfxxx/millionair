import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
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

            <h2 className="text-2xl font-bold text-white mb-6">معلومات</h2>

            <div className="space-y-4 text-purple-200">
              <p className="text-lg">
                تم تطوير اللعبة بواسطة:
                <br />
                <span className="text-white font-semibold">
                  إسلام كامل رجب - استوديو عطارد 2024
                </span>
              </p>

              <a
                href="https://www.facebook.com/Eslam.alfnnan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                زيارة صفحتي على فيسبوك
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;