import { create } from 'zustand';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';

interface GameState {
  isGameStarted: boolean;
  setIsGameStarted: (isGameStarted: boolean) => void;
}

export const useGameStore = create<GameState>()((set) => ({
  isGameStarted: false,
  setIsGameStarted: (isGameStarted) => set({ isGameStarted }),
}));

interface ScoreState {
  score: number;
  setScore: (score: number) => void;
  addScore: (score: number) => void;
}

export const useScoreStore = create<ScoreState>()((set) => ({
  score: 0,
  setScore: (score) => set({ score }),
  addScore: (score) => set((state) => ({ score: state.score + score })),
}));

interface LandmarksState {
  landmarks: HandLandmarkerResult | null;
  setLandmarks: (landmarks: HandLandmarkerResult | null) => void;
}

export const useLandmarksStore = create<LandmarksState>()((set) => ({
  landmarks: null,
  setLandmarks: (landmarks) => set({ landmarks }),
}));

interface TargetsState {
  passingTargets: Set<number>;
}

export const useTargetsStore = create<TargetsState>()(() => ({
  passingTargets: new Set(),
}));

interface SoundState {
  playSound: (sound: string) => void;
}

export const useSoundStore = create<SoundState>()(() => ({
  playSound: (sound) => {
    switch (sound) {
      case 'hit':
        const audio = new Audio('hit.mp3');
        audio.play();
        break;
      default:
        break;
    }
  },
}));
