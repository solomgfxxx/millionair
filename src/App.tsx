import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import SettingsModal from './components/SettingsModal';
import InfoModal from './components/InfoModal';
import GameOverScreen from './components/GameOverScreen';
import { GameState, Question, PRIZE_AMOUNTS } from './types';
import '@fontsource/cairo';
import './index.css';

const INITIAL_STATE: GameState = {
  currentQuestion: 0,
  questions: [],
  playerName: '',
  currentPrize: 0,
  usedLifelines: {
    phoneAFriend: false,
    fiftyFifty: false,
  },
  difficulty: 'سهل',
  gameStatus: 'menu',
  timeLeft: 30,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, [gameState.difficulty]);

  useEffect(() => {
    if (gameState.gameStatus === 'playing' && gameState.timeLeft > 0) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);

      setTimer(timer);

      return () => clearInterval(timer);
    } else if (gameState.timeLeft === 0 && gameState.gameStatus === 'playing') {
      handleGameOver('lost');
    }
  }, [gameState.gameStatus, gameState.timeLeft]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://x.simo-dev.xyz/apps/q.json');
      let filteredQuestions = response.data.questions;
      
      if (gameState.difficulty !== 'الكل') {
        filteredQuestions = filteredQuestions.filter(
          (q: Question) => q.difficulty === gameState.difficulty
        );
      }
      
      setGameState(prev => ({
        ...prev,
        questions: filteredQuestions.sort(() => Math.random() - 0.5).slice(0, 15)
      }));
    } catch (error) {
      toast.error('حدث خطأ في تحميل الأسئلة');
    }
  };

  const handleStartGame = () => {
    const playerName = prompt('من فضلك أدخل اسمك:');
    if (playerName) {
      toast.success(`مرحباً ${playerName}! مستوى الصعوبة: ${gameState.difficulty}`);
      setGameState(prev => ({
        ...prev,
        playerName,
        gameStatus: 'playing',
        timeLeft: 30,
      }));
    }
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = gameState.questions[gameState.currentQuestion];
    
    if (answer === currentQuestion.answer) {
      const newPrize = PRIZE_AMOUNTS[gameState.currentQuestion];
      
      if (gameState.currentQuestion === 14) {
        handleGameOver('won');
      } else {
        toast.success('إجابة صحيحة!');
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          currentPrize: newPrize,
          timeLeft: 30,
        }));
      }
    } else {
      handleGameOver('lost');
    }
  };

  const handleLifeline = (lifeline: 'phoneAFriend' | 'fiftyFifty') => {
    if (lifeline === 'phoneAFriend') {
      const currentQuestion = gameState.questions[gameState.currentQuestion];
      const willBeCorrect = Math.random() < 0.65;
      
      toast.promise(
        new Promise(resolve => setTimeout(resolve, 3000)),
        {
          loading: 'جاري الاتصال بصديقك...',
          success: () => `بص يا صاحبي، أعتقد إن الإجابة هي ${willBeCorrect ? currentQuestion.answer : currentQuestion.options.find(opt => opt !== currentQuestion.answer)}`,
          error: 'حدث خطأ في الاتصال',
        }
      );
    } else {
      const currentQuestion = gameState.questions[gameState.currentQuestion];
      const wrongOptions = currentQuestion.options.filter(
        opt => opt !== currentQuestion.answer
      );
      const eliminatedOptions = wrongOptions
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      
      setGameState(prev => ({
        ...prev,
        questions: prev.questions.map((q, i) =>
          i === prev.currentQuestion
            ? {
                ...q,
                options: q.options.filter(opt => !eliminatedOptions.includes(opt))
              }
            : q
        )
      }));
    }

    setGameState(prev => ({
      ...prev,
      usedLifelines: {
        ...prev.usedLifelines,
        [lifeline]: true
      }
    }));
  };

  const handleGameOver = (status: 'won' | 'lost' | 'quit') => {
    if (timer) clearInterval(timer);
    setGameState(prev => ({
      ...prev,
      gameStatus: status
    }));
  };

  const handleRestart = () => {
    setGameState(INITIAL_STATE);
    fetchQuestions();
  };

  return (
    <div dir="rtl" className="font-[Cairo]">
      <Toaster position="top-center" />
      
      <AnimatePresence mode="wait">
        {gameState.gameStatus === 'menu' && (
          <MainMenu
            onStartGame={handleStartGame}
            onOpenSettings={() => setShowSettings(true)}
            onOpenInfo={() => setShowInfo(true)}
            difficulty={gameState.difficulty}
          />
        )}

        {gameState.gameStatus === 'playing' && (
          <GameScreen
            gameState={gameState}
            onAnswer={handleAnswer}
            onUseLifeline={handleLifeline}
            onQuit={() => handleGameOver('quit')}
          />
        )}

        {['won', 'lost', 'quit'].includes(gameState.gameStatus) && (
          <GameOverScreen
            status={gameState.gameStatus as 'won' | 'lost' | 'quit'}
            playerName={gameState.playerName}
            prize={gameState.currentPrize}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        difficulty={gameState.difficulty}
        onChangeDifficulty={(difficulty) => {
          setGameState(prev => ({ ...prev, difficulty }));
          setShowSettings(false);
          toast.success(`تم تغيير مستوى الصعوبة إلى ${difficulty}`);
        }}
      />

      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
      />
    </div>
  );
}

export default App;