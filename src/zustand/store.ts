'use client';

import * as THREE from 'three';
import { create } from 'zustand';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MUSIC_NAME } from '@/constants/common';

interface GameState {
  isGameStarted: boolean;
  gameState: 'start' | 'pause' | 'idle';
  setIsGameStarted: (isGameStarted: boolean) => void;
  setGameState: (gameState: 'start' | 'pause' | 'idle') => void;
}

export const useGameStore = create<GameState>()((set) => ({
  isGameStarted: false,
  gameState: 'idle',
  setIsGameStarted: (isGameStarted) => {
    set({ isGameStarted });
    useMusicStore.getState().startMusic();
    useTimeStore.getState().startTime();
  },
  setGameState: (gameState) => {
    set({ gameState });
  },
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

interface MusicState {
  music: HTMLAudioElement | null;
  triggerMusic: () => void;
  resetMusic: () => void;
  startMusic: () => void;
}

export const useMusicStore = create<MusicState>()((set, get) => ({
  music: null,
  startMusic: () => {
    const { music } = get();
    if (!music) {
      const newMusic = new Audio(MUSIC_NAME);
      set({ music: newMusic });
      newMusic.play();
      return;
    }
    if (music.paused) {
      music.play();
    }
  },
  triggerMusic: () => {
    const { music } = get();
    if (!music) {
      const newMusic = new Audio(MUSIC_NAME);
      set({ music: newMusic });
      newMusic.play();
      return;
    }
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  },
  resetMusic: () => {
    const { music } = get();
    if (!music) return;
    music.currentTime = 0;
  },
}));

interface TimeState {
  time: THREE.Clock;
  isPaused: boolean;
  pauseStartTime: number;
  totalPausedTime: number;
  triggerTime: () => void;
  startTime: () => void;
}

export const useTimeStore = create<TimeState>()((set, get) => ({
  time: new THREE.Clock(),
  isPaused: false,
  pauseStartTime: 0,
  totalPausedTime: 0,
  startTime: () => {
    get().time?.start();
  },
  triggerTime: () => {
    const { isPaused, pauseStartTime, totalPausedTime, time } = get();
    if (!isPaused) {
      set({ isPaused: true, pauseStartTime: time.getElapsedTime() });
    } else {
      const newTotalPausedTime =
        totalPausedTime + time.getElapsedTime() - pauseStartTime;
      set({
        isPaused: false,
        totalPausedTime: newTotalPausedTime,
        pauseStartTime: 0,
      });
    }
  },
}));
