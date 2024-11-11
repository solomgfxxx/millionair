export interface Question {
  question: string;
  options: string[];
  answer: string;
  difficulty: string;
}

export interface GameState {
  currentQuestion: number;
  questions: Question[];
  playerName: string;
  currentPrize: number;
  usedLifelines: {
    phoneAFriend: boolean;
    fiftyFifty: boolean;
  };
  difficulty: string;
  gameStatus: 'menu' | 'playing' | 'won' | 'lost' | 'quit';
  timeLeft: number;
}

export const PRIZE_AMOUNTS = [
  1000, 2000, 3000, 5000, 10000,
  20000, 30000, 50000, 100000, 200000,
  300000, 500000, 750000, 1000000
];