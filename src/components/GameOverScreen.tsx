import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Download, Timer, Trophy, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';

interface GameOverScreenProps {
  status: 'won' | 'lost' | 'quit';
  playerName: string;
  prize: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  status,
  playerName,
  prize,
  onRestart,
}) => {
  React.useEffect(() => {
    if (status === 'won') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [status]);

  const messages = {
    won: [
      `مبروووك يا ${playerName} إنت برنس والله!`,
      `عاش يا بطل! فخورين بيك يا ${playerName}`,
      `${playerName} قدها وقدود! مبروك المليون`
    ],
    lost: [
      'للأسف خسرت، لكن المحاولة شجاعة!',
      'حظ أوفر المرة القادمة',
      'لا تستسلم، جرب مرة أخرى'
    ],
    quit: [
      'قرار حكيم! أحيانا الانسحاب أفضل',
      'خرجت بمكسب محترم',
      'عود أقوى في المرة القادمة'
    ]
  };

  const getMessage = () => {
    const messageList = messages[status];
    return messageList[Math.floor(Math.random() * messageList.length)];
  };

  const handleScreenshot = async () => {
    const element = document.getElementById('check');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `millionaire-check-${playerName}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center p-8"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          id="check"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-500/30 mb-8"
        >
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {status === 'won' && <Trophy className="w-16 h-16 text-yellow-400" />}
            {status === 'lost' && <Timer className="w-16 h-16 text-red-400" />}
            {status === 'quit' && <ArrowLeft className="w-16 h-16 text-blue-400" />}
          </div>

          {/* Check Content */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">{getMessage()}</h2>
            <div className="text-xl text-purple-200">
              <p>الجائزة المكتسبة</p>
              <p className="text-4xl font-bold text-white">{prize} جنيه</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScreenshot}
            className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-6 rounded-xl text-lg font-semibold flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            حفظ الشيك
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded-xl text-lg font-semibold"
          >
            العودة للقائمة الرئيسية
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameOverScreen;