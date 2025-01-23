import { create } from 'zustand';

interface GameState {
  isGameStarted: boolean;
  setIsGameStarted: (isGameStarted: boolean) => void;
}

export const useGameStore = create<GameState>()((set) => ({
  isGameStarted: false,
  setIsGameStarted: (isGameStarted) => set({ isGameStarted }),
}));
